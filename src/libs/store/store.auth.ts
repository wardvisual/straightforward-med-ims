import { create } from "zustand";
import supabaseService from "../services/supabase";
import { v4 as uuidv4 } from "uuid";
import { getCurrentDate } from "../helpers/utils";
import encryptor from "../helpers/encryptor";

const useAuthStore = create((set, get: any) => ({
  hasChanges: false,
  form: {},
  isAuthenticated: JSON.parse(JSON.stringify(localStorage.getItem("csu_user")))
    ? true
    : false,
  user:
    JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("csu_user")))) &&
    JSON.parse(localStorage.getItem("csu_user") || ""),
  notification: {
    type: "",
    title: "",
    description: "",
  },

  logout: () => {
    localStorage.removeItem("csu_user");
    window.location.href = "login";
  },

  login: async (state: any) => {
    state.preventDefault();

    const formData = new FormData(state.target);
    const userData: any = {};

    for (let [key, value] of formData.entries()) {
      userData[key] = value.toString();
    }

    supabaseService.setTable("users");

    const response = await supabaseService.selectBy(
      "username",
      userData.username
    );

    if (response.status) {
      if (
        await encryptor.decrypt(userData.password, response.result.password)
      ) {
        localStorage.setItem("csu_user", JSON.stringify(response.result));

        response.result.password = null;

        set((state: any) => ({
          isAuthenticated: JSON.parse(
            JSON.stringify(localStorage.getItem("csu_user"))
          )
            ? true
            : false,
          hasChanges: !state.hasChanges,
          notification: {
            type: "success",
            title: "Login Successful",
            description: "Welcome back! You have successfully logged in.",
          },
        }));
      } else {
        set((state: any) => ({
          hasChanges: !state.hasChanges,
          notification: {
            type: "error",
            title: "Login Failed",
            description: "Invalid Password",
          },
        }));
      }
    } else {
      set((state: any) => ({
        hasChanges: !state.hasChanges,
        notification: {
          type: "error",
          title: "Login Failed",
          description: "Invalid Username or Password.",
        },
      }));
    }
  },

  register: async (state: any) => {
    state.preventDefault();
    const formData = new FormData(state.target);
    const userData: any = {};

    for (let [key, value] of formData.entries()) {
      userData[key] = value.toString();
    }

    userData.id = uuidv4();
    userData.createdAt = getCurrentDate();
    userData.password = await encryptor.encrypt(userData.password);

    supabaseService.setTable("users");

    const response = await supabaseService.add(userData);

    if (response.status) {
      state.target.reset();
      set((state: any) => ({
        hasChanges: !state.hasChanges,
        notification: {
          type: "success",
          title: "You are now Registered",
          description: "Congratulations! You are now registered.",
        },
      }));
    } else {
      set((state: any) => ({
        hasChanges: !state.hasChanges,
        notification: {
          type: "error",
          title: "Registration Failed",
          description: "Please try again",
        },
      }));
    }
  },
}));

export default useAuthStore;
