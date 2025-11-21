import { createContext, useState, type ReactNode, useEffect } from "react";
import type { CartContextType, CartItem } from "../models/ui/store/cart";
import { useAudio } from "./AudioContext";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { playAddToCartSound, playRemoveFromCartSound } = useAudio();

  useEffect(() => {
    const saved = sessionStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    playAddToCartSound();
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: number) => {
    playRemoveFromCartSound();
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: number, cantidad: number) =>
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, cantidad) } : i
      )
    );

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
