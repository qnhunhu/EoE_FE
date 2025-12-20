import { CartItem } from "./CartItem";

export type Cart = {
    cartId: number;
    buyerId: number;
    items: CartItem[];
  };