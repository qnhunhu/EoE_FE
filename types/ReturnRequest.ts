import { Order } from './Order';

export enum ReturnStatus {
    Pending = 0,
    Approved = 1,
    Rejected = 2,
  }

export interface ReturnRequest {
  returnId: number;
  orderId: number;
  reason?: string | null;
  status: ReturnStatus;
  updatedAt?: string | null;
  createdAt: string;
  order: Order;
}
