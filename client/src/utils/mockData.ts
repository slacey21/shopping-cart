import { Product, CartItem } from "../types/index";

export const MOCK_PRODUCTS: Product[] = [
  {
    _id: "6842228588ad130dfcc626c8",
    title: "Apple iPod 14 Pro Max 256GB",
    price: 899.99,
    quantity: 42,
    createdAt: "2025-06-05T23:04:37.816Z",
    updatedAt: "2025-06-05T23:06:30.346Z",
    __v: 0
  },
  {
    _id: "6842229588ad130dfcc626ca",
    title: "Amazon Kindle Paperwhite",
    price: 139.99,
    quantity: 17,
    createdAt: "2025-06-05T23:04:53.889Z",
    updatedAt: "2025-06-05T23:06:32.125Z",
    __v: 0
  },
  {
    _id: "684222e488ad130dfcc626d0",
    title: "Nike Air Force One",
    price: 99.99,
    quantity: 1,
    createdAt: "2025-06-05T23:06:12.929Z",
    updatedAt: "2025-06-05T23:06:33.149Z",
    __v: 0
  },
  {
    _id: "684222f388ad130dfcc626d2",
    title: "MacBook Air M2 13\"",
    price: 1499.99,
    quantity: 8,
    createdAt: "2025-06-05T23:06:27.388Z",
    updatedAt: "2025-06-05T23:06:35.563Z",
    __v: 0
  }
];

export const MOCK_CART: CartItem[] = [
  {
    _id: "684222f688ad130dfcc626d9",
    title: "Apple iPod 14 Pro Max 256GB",
    price: 899.99,
    quantity: 3,
    productId: "6842228588ad130dfcc626c8",
    createdAt: "2025-06-05T23:06:30.134Z",
    updatedAt: "2025-06-05T23:06:30.401Z",
    __v: 0
  },
  {
    _id: "684222f788ad130dfcc626e6",
    title: "Amazon Kindle Paperwhite",
    price: 139.99,
    quantity: 5,
    productId: "6842229588ad130dfcc626ca",
    createdAt: "2025-06-05T23:06:31.082Z",
    updatedAt: "2025-06-05T23:06:32.174Z",
    __v: 0
  },
  {
    _id: "684222f988ad130dfcc626fb",
    title: "Nike Air Force One",
    price: 99.99,
    quantity: 1,
    productId: "684222e488ad130dfcc626d0",
    createdAt: "2025-06-05T23:06:33.203Z",
    updatedAt: "2025-06-05T23:06:33.203Z",
    __v: 0
  },
  {
    _id: "684222fa88ad130dfcc62700",
    title: "MacBook Air M2 13\"",
    price: 1499.99,
    quantity: 2,
    productId: "684222f388ad130dfcc626d2",
    createdAt: "2025-06-05T23:06:34.646Z",
    "updatedAt": "2025-06-05T23:06:35.622Z",
    __v: 0
  }
]