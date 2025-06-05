import {test, expect, vi} from "vitest";
import axios from "axios";
import {
  getProducts,
  getCart,
  addProduct,
  updateProduct,
  deleteProduct,
  checkout,
  addToCart
} from "./api";

const MOCK_PRODUCTS = [
  {
    _id: "61d754d72092473d55a809e1",
    title: "Kindle",
    price: 50,
    quantity: 2,
    createdAt: "2020-10-04T05:57:02.777Z",
    updatedAt: "2020-10-04T05:57:02.777Z",
    __v: 0
  },
  {
    _id: "51d754d72092473333a809e1",
    title: "Mac Mini",
    price: 850,
    quantity: 7,
    createdAt: "2020-10-04T05:57:02.777Z",
    updatedAt: "2020-10-04T05:57:02.777Z",
    __v: 0
  }
];

const MOCK_NEW_PRODUCT = {
  title: MOCK_PRODUCTS[0].title,
  price: MOCK_PRODUCTS[0].price,
  quantity: MOCK_PRODUCTS[0].quantity,
};

const MOCK_CART = [
  {
    _id: "545454f72092473d55a809e1",
    title: "Kindle",
    price: 50,
    quantity: 1,
    productId: "61d754d72092473d55a809e1",
    createdAt: "2020-10-04T05:57:02.777Z",
    updatedAt: "2020-10-04T05:57:02.777Z",
    __v: 0
  },
  {
    _id: "51d754d72092473333a809e1",
    title: "Mac Mini",
    price: 850,
    quantity: 2,
    productId: "51d754d72092473333a809e1",
    createdAt: "2020-10-04T05:57:02.777Z",
    updatedAt: "2020-10-04T05:57:02.777Z",
    __v: 0
  }
];


vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

test("getProducts returns list of products on success", async () => {
  mockedAxios.get.mockResolvedValue({data: MOCK_PRODUCTS});
  const products = await getProducts();
  expect(products).toEqual(MOCK_PRODUCTS);
});

test("getProducts throws on error", async () => {
  const errorMessage = "Test Error"
  mockedAxios.get.mockRejectedValue(Error(errorMessage));
  await expect(getProducts()).rejects.toThrow(errorMessage);
});

test("getCart returns list of cart items on success", async () => {
  mockedAxios.get.mockResolvedValue({data: MOCK_CART});
  const cart = await getCart();
  expect(cart).toEqual(MOCK_CART);
});

test("getCart throws on error", async () => {
  const errorMessage = "Test Error"
  mockedAxios.get.mockRejectedValue(Error(errorMessage));
  await expect(getCart()).rejects.toThrow(errorMessage);
});

test("addProduct returns newly created product on success", async () => {
  mockedAxios.post.mockResolvedValue({data: MOCK_PRODUCTS[0]});
  const newProduct = await addProduct(MOCK_NEW_PRODUCT);
  expect(newProduct).toEqual(MOCK_PRODUCTS[0]);
});

test("addProduct throws on error", async () => {
  const errorMessage = "Test Error"
  mockedAxios.post.mockRejectedValue(Error(errorMessage));
  await expect(addProduct(MOCK_NEW_PRODUCT)).rejects.toThrow(errorMessage);
});

test("updateProduct returns updated product on success", async () => {
  mockedAxios.put.mockResolvedValue({data: MOCK_PRODUCTS[0]});
  const updatedProduct = await updateProduct(MOCK_PRODUCTS[0]);
  expect(updatedProduct).toEqual(MOCK_PRODUCTS[0]);
});

test("updateProduct throws on error", async () => {
  const errorMessage = "Test Error"
  mockedAxios.put.mockRejectedValue(Error(errorMessage));
  await expect(updateProduct(MOCK_PRODUCTS[0])).rejects.toThrow(errorMessage);
});

test("deleteProduct returns true (200 OK) on success", async () => {
  mockedAxios.delete.mockResolvedValue({ status: 200 });
  const deleted = await deleteProduct(MOCK_PRODUCTS[0]._id);
  expect(deleted).toBe(true);
});

test("deleteProduct returns false (not 200 OK) on success", async () => {
  mockedAxios.delete.mockResolvedValue({ status: 400 });
  const deleted = await deleteProduct(MOCK_PRODUCTS[0]._id);
  expect(deleted).toBe(false);
});

test("deleteProduct throws on error", async () => {
  const errorMessage = "Test Error"
  mockedAxios.delete.mockRejectedValue(Error(errorMessage));
  await expect(deleteProduct(MOCK_PRODUCTS[0]._id)).rejects.toThrow(errorMessage);
});

test("checkout returns true (200 OK) on success", async () => {
  mockedAxios.post.mockResolvedValue({ status: 200 });
  const checkoutComplete = await checkout();
  expect(checkoutComplete).toBe(true);
});

test("checkout returns false (not 200 status) on failure", async () => {
  mockedAxios.post.mockResolvedValue({ status: 400 });
  const checkoutComplete = await checkout();
  expect(checkoutComplete).toBe(false);
});

test("checkout throws on error", async () => {
  const errorMessage = "Test Error"
  mockedAxios.post.mockRejectedValue(Error(errorMessage));
  await expect(checkout()).rejects.toThrow(errorMessage);
});

test("addToCart returns updated cart item and product", async () => {
  const mockResponse = {
    product: MOCK_PRODUCTS[1],
    item: MOCK_CART[1],
   }
  mockedAxios.post.mockResolvedValue({data: mockResponse});
  const updatedProductAndCartItem = await addToCart(MOCK_PRODUCTS[1]._id);
  expect(updatedProductAndCartItem).toEqual(mockResponse);
});

test("addToCart throws on error", async () => {
  const errorMessage = "Test Error"
  mockedAxios.post.mockRejectedValue(Error(errorMessage));
  await expect(addToCart(MOCK_PRODUCTS[1]._id)).rejects.toThrow(errorMessage);
});