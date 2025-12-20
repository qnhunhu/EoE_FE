import { Product } from './Product';

export interface Store {
  storeId: number;
  sellerId: number;
  storeName: string;
  businessLicense: string;
  description: string;
  eggCount: number;
  eggs: Product[];
}



