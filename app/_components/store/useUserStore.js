import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      // ================= STATE =================
      userInformation: null,

      // ================= ACTIONS =================
      setUserInformation: (data) =>
        set({
          userInformation: data,
        }),

      clearUserInformation: () =>
        set({
          userInformation: null,
        }),
    }),
    {
      name: "user-storage",
    }
  )
);
