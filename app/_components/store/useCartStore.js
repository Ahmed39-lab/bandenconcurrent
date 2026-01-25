import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          const exists = state.cart.find((c) => c.id === item.id);

          if (exists) {
            return {
              cart: state.cart.map((c) =>
                c.id === item.id ? { ...c, qty: c.qty + 1 } : c
              ),
            };
          }

          return {
            cart: [...state.cart, { ...item, qty: 1 }],
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // unique name in localStorage
    }
  )
);
