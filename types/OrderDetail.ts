import { Product } from "./Product";

export interface OrderDetail {
    orderDetailId: number;
    orderId: number;
    eggName: string;
    eggImageURL: string;
    eggId: number;
    quantity: number;
    unitPrice: number;
    egg: Product;
  }