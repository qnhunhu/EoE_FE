export interface Account {
    userId: number;
    name: string;
    email: string;
    passwordHash?: string; 
    role: Role;
    phone: string;
    address: string;
    orders: any[];
    complaints: any[];
    ratings: any[];
}
export type Role = 'Admin' | 'Buyer' | 'Distributor' | 'Seller'; 

export interface AuthResponse {
    userId: number;
    email: string;
    name: string;
    role: Role;
    phone: string;
    address: string;
    token: string;
}