import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: number;
  name: string;
  price:number,
  qty:number,
  image: string,
};

type CartState = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
};

export const useCartStore = create(
  persist<CartState>(
    (set) => ({
      cart: [],

    addToCart: (item: any) =>
  set((state: any) => {
    const { id } = item;

    const exists = state.cart.find((c: any) => c.id === id);

    if (exists) {
      return {
        cart: state.cart.map((c: any) =>
          c.id === id ? { ...c, qty: c.qty + 1 } : c
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
    }),
    {
      name: "cart-storage",
    }
  )
);

    
// import { create } from "zustand";

// type CartItem = {
//   id: number;
//   name: string;
//   price: number;
//   qty: number;
// };

// type CartState = {
//   cart: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: number) => void;
//   clearCart: () => void;
// };

// export const useCartStore = create<CartState>((set) => ({
//   cart: [],

//   addToCart: (item) =>
//     set((state) => ({
//       cart: [...state.cart, item],
//     })),

//   removeFromCart: (id) =>
//     set((state) => ({
//       cart: state.cart.filter((item) => item.id !== id),
//     })),

//   clearCart: () => set({ cart: [] }),
// }));

