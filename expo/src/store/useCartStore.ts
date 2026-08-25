import { create } from 'zustand';

interface CartItem {
  id: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (id: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => set({ items: [] }),
}));
