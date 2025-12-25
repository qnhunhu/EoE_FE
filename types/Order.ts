import { OrderDetail } from './OrderDetail';
import { Payment } from './Payment';

export interface Order {
  orderId: number;
  buyerId: number;
  distributorId: number;
  orderDate: string;
  status: OrderStatus;
  shippingAddress: string;
  complaints: any[];
  orderDetails: OrderDetail[];
  payment: Payment;
  returnRequest: any| null;
}
export enum OrderStatus {
  ORDERED = 'ORDERED',
  SELLER_CONFIRMED = 'SELLER_CONFIRMED',
  SELLER_REFUSED = 'SELLER_REFUSED',
  SHIPPED_TO_DISTRIBUTOR = 'SHIPPED_TO_DISTRIBUTOR',
  ARRIVED_AT_DISTRIBUTOR = 'ARRIVED_AT_DISTRIBUTOR',
  RECEIVED_BY_BUYER = 'RECEIVED_BY_BUYER',
  RETURN_REQUEST = 'RETURN_REQUEST',
  RETURN = 'RETURN',
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
  DELIVERING = "DELIVERING"
}

export interface CreateOrderCommand {
  buyerId: number;
  distributorId: number;
  paymentMethod?: string | null;
  shippingAddress?: string | null;
}