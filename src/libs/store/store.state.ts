import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const useAppStore = create(
  subscribeWithSelector(() => ({
    hasChanges: false,
    form: {},
    notification: {
      type: "",
      title: "",
      description: "",
    },
  }))
);

export default useAppStore;
