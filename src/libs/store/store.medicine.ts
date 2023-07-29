import { create } from "zustand";
import supabaseService from "../services/supabase";
import { v4 as uuidv4 } from "uuid";
import { getCurrentDate } from "../helpers/utils";
import zukeeper from "zukeeper";

const useMedicineStore = create(
  zukeeper((set, get: any) => ({
    hasChanges: false,
    form: {},
    notification: {
      type: "",
      title: "",
      description: "",
    },
    medicines: [],
    transactions: [],
    notifications: [],
    cabinets: [],
    drawers: [],
    cabinet: {},
    unSeenNotificationCount: 0,

    selectCabinet: (cabinet: any) => {
      set((state) => ({
        cabinet,
      }));
    },

    updateForm: async (data: any) => {
      set(() => ({
        form: { ...data },
      }));
    },

    onChange: async (event: any, value: any = []) => {
      set((state: any) => ({
        form: {
          ...state.form,
          [event?.target?.name || event]: event?.target?.value || value,
        },
      }));
    },

    pushMedicines: async (medicines: any) => {
      set((state: any) => ({
        medicines: [...medicines],
      }));
    },

    requestMedication: async (medication: any) => {
      medication.preventDefault();
      let requestId = uuidv4();

      const formData = new FormData(medication.target);
      const medicationData: any = {};

      for (let [key, value] of formData.entries()) {
        medicationData[key] = value.toString();
      }
      medicationData.createdAt = getCurrentDate();
      medicationData.id = requestId;

      supabaseService.setTable("patientRequests");

      const response = await supabaseService.add(medicationData);

      supabaseService.setTable("transactions");

      set(() => ({
        form: {
          id: uuidv4(),
          status: `Pending`,
          type: `Out`,
          patientRequestId: requestId,
          createdAt: getCurrentDate(),
        },
      }));

      const transactionResponse = await supabaseService.add(get().form);

      if (response.status && transactionResponse.status) {
        medication.target.reset();

        set((state: any) => ({
          hasChanges: !state.hasChanges,
          notification: {
            type: "success",
            title: "Medication Request Successful",
            description:
              "Your medication request has been successfully submitted.",
          },
        }));
      } else {
        set((state: any) => ({
          hasChanges: !state.hasChanges,
          notification: {
            type: "error",
            title: "Medication Request Failed",
            description:
              "Your medication request could not be submitted. Please try again later.",
          },
        }));
      }
    },

    countUnSeenNotifications: () => {
      const { notifications } = get();

      const count = notifications?.filter((el) => !el.isRead).length;

      set((state) => ({
        unSeenNotificationCount: count,
      }));
    },

    createNotification: async (data: any) => {
      supabaseService.setTable("notifications");

      const notification = {
        id: uuidv4(),
        title: `test`,
        description: `test`,
        isRead: false,
        createdAt: getCurrentDate(),
        transactionId: data.id,
      };

      await supabaseService.add(notification);
    },

    readNotification: async () => {
      supabaseService.setTable("notifications");

      await supabaseService.updateAll({ isRead: true });

      const { result } = await supabaseService.fetchAll();

      set((state) => ({
        notifications: result,
      }));

      get().countUnSeenNotifications();
    },

    getNotification: async () => {
      const response = await supabaseService.subscribeToEvent(
        `transactions`,
        async (res) => {
          await get().createNotification(res);

          supabaseService.setTable("notifications");

          const { result } = await supabaseService.fetchAll();

          set((state) => ({
            notifications: result,
          }));

          get().countUnSeenNotifications();
        }
      );
    },

    createCabinet: async (cabinet: any) => {
      cabinet.preventDefault();

      const _cabinet: any = {};
      let _drawers: any = [];
      let _drawer: any = {};
      let cabinetId = uuidv4();

      const formData = get().form;

      supabaseService.setTable("cabinets");

      _cabinet.name = formData.cabinet;
      _cabinet.createdAt = getCurrentDate();
      _cabinet.id = cabinetId;

      const response = await supabaseService.add(_cabinet);

      if (!response.status) {
        set((state: any) => ({
          hasChanges: !state.hasChanges,
          notification: {
            type: "error",
            title: "Cabinet Creation Failed",
            description:
              "Your cabinet could not be created. Please try again later.",
          },
        }));

        return;
      }

      for (const _ of formData?.drawer) {
        _drawer.name = _;
        _drawer.id = uuidv4();
        _drawer.cabinetId = cabinetId;

        _drawers.push(_drawer);
        _drawer = {};
      }

      supabaseService.setTable("drawers");

      const _drawersSubmission = await supabaseService.add(_drawers);

      if (_drawersSubmission.status) {
        cabinet.target.reset();
        set((state: any) => ({
          hasChanges: !state.hasChanges,
          notification: {
            type: "success",
            title: "Cabinet Created",
            description: "Your cabinet has been successfully created.",
          },
        }));
      } else {
        set((state: any) => ({
          hasChanges: !state.hasChanges,
          notification: {
            type: "error",
            title: "Cabinet Creation Failed",
            description:
              "Your cabinet could not be created. Please try again later.",
          },
        }));
      }
    },

    createMedicine: async (medicine: any) => {
      medicine.preventDefault();

      const formData = new FormData(medicine.target);
      const medicineData: any = {};

      for (let [key, value] of formData.entries()) {
        medicineData[key] = value.toString();
      }

      medicineData.createdAt = getCurrentDate();
      medicineData.id = uuidv4();

      supabaseService.setTable("medicines");

      const response = await supabaseService.add(medicineData);

      if (response.status) {
        medicine.target.reset();
        set((state: any) => ({
          hasChanges: !state.hasChanges,
          notification: {
            type: "success",
            title: "Medicine Created",
            description: "Your medicine has been successfully created.",
          },
        }));
      } else {
        set((state: any) => ({
          hasChanges: !state.hasChanges,
          notification: {
            type: "error",
            title: "Medicine Creation Failed",
            description:
              "Your medicine could not be created. Please try again later.",
          },
        }));
      }
    },

    fetchAll: async (table: string, query: any = false, as?: string) => {
      supabaseService.setTable(table);

      const response = await supabaseService.fetchAll(query);

      if (response.status) {
        set((state: any) => ({
          [as ? as : table]: response.result,
        }));

        get().transformCabinet();

        return response.result;
      } else {
        set((state: any) => ({
          [as ? as : table]: [],
        }));
      }
    },

    transformCabinet: () => {
      const { cabinets, drawers } = get();

      const transformed = cabinets.reduce((result, cabinet) => {
        const _drawers = drawers
          .filter((el) => el.cabinetId === cabinet.id)
          .map((el) => ({
            name: el.name,
            id: el.id,
            medicineId: el.medicineId,
          }));

        result.push({
          name: cabinet.name,
          id: cabinet.id,
          drawers: _drawers,
        });

        return result;
      }, []);

      set((state) => ({
        cabinets: transformed,
      }));
    },

    fetchAllWithArrayOfIds: async (firstTable: string, secondTable: string) => {
      supabaseService.setTable(firstTable);
      const firstTableResponse: any = await supabaseService.fetchAll();

      if (!firstTableResponse.status) {
        return;
      }

      supabaseService.setTable(secondTable);
      const secondTableResponse: any = await supabaseService.fetchAll();

      let arr: any = [];
      for (const _ of secondTableResponse.result) {
        firstTableResponse.result.map(
          (el, i) =>
            el.drawerIds[0][i] === _.id &&
            arr.push({
              ...el,
              drawerIds: el.drawerIds[0][i] === _.id && [el.drawerIds[0][i]],
            })
        );
      }
    },

    request: async (request: any) => {
      request.preventDefault();

      const formData = new FormData(request.target);
      const requestedMedicine: any = {};
      let requestId = uuidv4();

      for (let [key, value] of formData.entries()) {
        requestedMedicine[key] = value.toString();
      }

      requestedMedicine.createdAt = getCurrentDate();
      requestedMedicine.id = requestId;

      supabaseService.setTable("medicineRequests");

      const requestResponse = await supabaseService.add(requestedMedicine);

      supabaseService.setTable("transactions");

      set(() => ({
        form: {
          id: uuidv4(),
          status: `Pending`,
          type: `In`,
          adminMedicineRequestId: requestId,
          createdAt: getCurrentDate(),
        },
      }));

      const transactionResponse = await supabaseService.add(get().form);

      if (requestResponse.status && transactionResponse.status) {
        request.target.reset();
        set((state: any) => ({
          hasChanges: !state.hasChanges,
          notification: {
            type: "success",
            title: "Request Successful",
            description:
              "Your medicine request has been successfully submitted.",
          },
        }));
      } else {
        set((state: any) => ({
          hasChanges: !state.hasChanges,
          notification: {
            type: "error",
            title: "Request Failed",
            description:
              "Your medicine request could not be submitted. Please try again later.",
          },
        }));
      }
    },

    updateMedicine: async (id: any, updatedMedicine: any) => {
      updatedMedicine.preventDefault();

      const formData = new FormData(updatedMedicine.target);
      const medicineData: any = {};

      for (let [key, value] of formData.entries()) {
        medicineData[key] = value.toString();
      }

      supabaseService.setTable("medicines");

      const response = await supabaseService.update(id, medicineData);

      if (response.status) {
        updatedMedicine.target.reset();
        set((state: any) => ({
          notification: {
            type: "success",
            title: "Medicine Updated",
            description: "Your medicine has been successfully updated.",
          },
        }));
      } else {
        set((state: any) => ({
          notification: {
            type: "error",
            title: "Update Failed",
            description:
              "Your medicine could not be updated. Please try again later.",
          },
        }));
      }

      set((state: any) => ({
        hasChanges: !state.hasChanges,
      }));
    },

    deleteById: async (id: string) => {
      supabaseService.setTable("medicines");

      await supabaseService.deleteById(id);

      set((state: any) => ({
        medicines: state.medicines.filter(
          (medicine: any) => medicine.id !== id
        ),
        hasChanges: !state.hasChanges,
      }));
    },

    clearMedicines: () => {
      set({ medicines: [] });
    },
  }))
);

window["store"] = useMedicineStore;

export default useMedicineStore;
