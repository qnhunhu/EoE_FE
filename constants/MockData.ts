
import { AuthResponse } from '@/types/Account';
import { Cart } from '@/types/Cart';
import { CartItem } from '@/types/CartItem';
import { Order } from '@/types/Order';
import { Product } from '@/types/Product';

export const MOCK_PRODUCTS: Product[] = [
    {
        eggId: 1,
        storeId: 1,
        name: 'Gà Ta Eggs (Dozen)',
        description: 'Fresh organic eggs from free-range chickens.',
        price: 50000,
        stockQuantity: 100,
        imageURL: 'https://img.freepik.com/free-photo/brown-eggs-wooden-bowl_1150-25932.jpg',
        soldCount: 150,
        orderDetails: [],
        ratings: [],
    },
    {
        eggId: 2,
        storeId: 1,
        name: 'Vịt Lộn (Balut)',
        description: 'Traditional fertilized duck egg, a delicacy.',
        price: 8000,
        stockQuantity: 50,
        imageURL: 'https://vcdn-dulich.vnecdn.net/2021/05/20/trung-vit-lon-1621503348.jpg',
        soldCount: 300,
        orderDetails: [],
        ratings: [],
    },
    {
        eggId: 3,
        storeId: 2,
        name: 'Gà Công Nghiệp (Tray 30)',
        description: 'Standard industrial eggs, perfect for baking.',
        price: 90000,
        stockQuantity: 200,
        imageURL: 'https://cdn.tgdd.vn/Products/Images/8820/232491/bhx/vi-10-trung-ga-so-1-ba-huan-hop-600g-202104210953043232.jpg',
        soldCount: 500,
        orderDetails: [],
        ratings: [],
    },
    {
        eggId: 4,
        storeId: 2,
        name: 'Trứng Cút (Quail Eggs)',
        description: 'Small, speckled eggs, great for snacks.',
        price: 20000,
        stockQuantity: 1000,
        imageURL: 'https://cdn.tgdd.vn/Products/Images/8820/282386/bhx/vi-30-trung-cut-vinh-thanh-dat-hop-320g-202206151433379204.jpg',
        soldCount: 800,
        orderDetails: [],
        ratings: [],
    },
    {
        eggId: 5,
        storeId: 1,
        name: 'Trứng Muối (Salted Egg)',
        description: 'Preserved salted duck eggs, rich flavor.',
        price: 6000,
        stockQuantity: 80,
        imageURL: 'https://beptruong.edu.vn/wp-content/uploads/2013/05/trung-muoi.jpg',
        soldCount: 220,
        orderDetails: [],
        ratings: [],
    },
];

export const MOCK_USER: AuthResponse = {
    userId: 1,
    email: 'datrobot@example.com',
    name: 'Dat Robot',
    role: 'Buyer',
    phone: '0901234567',
    address: '123 Fake Street, HCM',
    token: 'mock-jwt-token-123456',
};

export const MOCK_CART_ITEMS: CartItem[] = [
    {
        cartItemId: 1,
        eggId: 1,
        eggName: 'Gà Ta Eggs (Dozen)',
        eggPrice: 50000,
        quantity: 2,
        total: 100000,
    },
    {
        cartItemId: 2,
        eggId: 4,
        eggName: 'Trứng Cút (Quail Eggs)',
        eggPrice: 20000,
        quantity: 1,
        total: 20000,
    },
];

export const MOCK_CART: Cart = {
    cartId: 1,
    buyerId: 1,
    items: MOCK_CART_ITEMS,
};

export const MOCK_ORDERS: Order[] = [
    {
        orderId: 101,
        buyerId: 1,
        distributorId: 10,
        orderDate: '2023-10-25T10:00:00Z',
        status: 'RECEIVED_BY_BUYER',
        shippingAddress: '123 Fake Street, HCM',
        complaints: [],
        orderDetails: [
            {
                orderDetailId: 1001,
                orderId: 101,
                eggName: 'Gà Ta Eggs (Dozen)',
                eggImageURL: 'https://img.freepik.com/free-photo/brown-eggs-wooden-bowl_1150-25932.jpg',
                eggId: 1,
                quantity: 1,
                unitPrice: 50000,
                egg: MOCK_PRODUCTS[0],
            }
        ],
        payment: {
            paymentId: 501,
            orderId: 101,
            paymentDate: '2023-10-25T10:05:00Z',
            method: 'Momo',
            amount: 50000
        },
        returnRequest: null
    },
    {
        orderId: 102,
        buyerId: 1,
        distributorId: 10,
        orderDate: '2023-10-27T14:30:00Z',
        status: 'ORDERED',
        shippingAddress: '123 Fake Street, HCM',
        complaints: [],
        orderDetails: [
            {
                orderDetailId: 1002,
                orderId: 102,
                eggName: 'Vịt Lộn (Balut)',
                eggImageURL: 'https://vcdn-dulich.vnecdn.net/2021/05/20/trung-vit-lon-1621503348.jpg',
                eggId: 2,
                quantity: 5,
                unitPrice: 8000,
                egg: MOCK_PRODUCTS[1],
            }
        ],
        payment: {
            paymentId: 502,
            orderId: 102,
            paymentDate: '2023-10-27T14:35:00Z',
            method: 'COD',
            amount: 40000
        },
        returnRequest: null
    }
];
