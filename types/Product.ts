export interface Product {
    eggId: number;
    storeId: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    imageURL: string;
  soldCount: number;
  orderDetails: any[]; // Replace with actual type if available
  ratings: any[]; // Replace with actual type if available
  
  }
