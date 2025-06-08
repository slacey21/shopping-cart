import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from "./App.tsx";
import { vi } from "vitest";
import * as api from "./services/api.ts";
import { MOCK_CART, MOCK_PRODUCTS } from './utils/mockData.ts';

vi.mock("./services/api.ts");
const MOCKS = {
  getProducts: vi.mocked(api.getProducts),
  getCart: vi.mocked(api.getCart),
  addProduct: vi.mocked(api.addProduct),
  updateProduct: vi.mocked(api.updateProduct),
  deleteProduct: vi.mocked(api.deleteProduct),
  checkout: vi.mocked(api.checkout),
  addToCart: vi.mocked(api.addToCart)
};

beforeEach(() => {
  MOCKS.getProducts.mockResolvedValue(MOCK_PRODUCTS);
  MOCKS.getCart.mockResolvedValue(MOCK_CART);
  render(<App />);
});

afterEach(() => {
  vi.resetAllMocks();
});

/*
THIS GROUP OF TESTS CHECKS EXISTENCE OF ELEMENTS ON RENDER
*/
test("All products exist", async () => {
  const prod1 = await screen.findByRole("heading", {name: "Apple iPod 14 Pro Max 256GB"});
  const prod2 = await screen.findByRole("heading", {name: "Amazon Kindle Paperwhite"});
  const prod3 = await screen.findByRole("heading", {name: "Nike Air Force One"});
  const prod4 = await screen.findByRole("heading", {name: "MacBook Air M2 13\""});
  const products = [prod1, prod2, prod3, prod4];
  
  products.forEach(product => expect(product).toBeInTheDocument());
});

test("All Products have Edit Button", async () => {
  const editProductFormButtons = await screen.findAllByRole("button", {name: /Edit/});
  expect(editProductFormButtons).toHaveLength(MOCK_PRODUCTS.length);
});

test("All Products have Add to Cart Button", async () => {
  const editProductFormButtons = await screen.findAllByRole("button", {name: /Add to Cart/});
  expect(editProductFormButtons).toHaveLength(MOCK_PRODUCTS.length);
});

test("Add a Product button exists", async () => {
  const addProductButton = await screen.findByRole("button", {name: "Add a Product"});
  expect(addProductButton).toBeInTheDocument();
});

test("Cart total and checkout button exist", async () => {
  const cartTotal = await screen.findByText("$6499.89");
  const checkoutButton = screen.queryByRole("button", {name: "Checkout"});
  expect(cartTotal).toBeInTheDocument();
  expect(checkoutButton).toBeInTheDocument();
});

/*
THIS GROUP OF TESTS TESTS ADD PRODUCT FORM FUNCTIONALITY
*/
test("Clicking 'Add a Product' displays add product form and hides button", async () => {
  const addProductFormButton = await screen.findByRole("button", {name: /Add a Product/});
  await userEvent.click(addProductFormButton);
  
  const addProductForm = screen.queryByRole("form");
  expect(addProductFormButton).not.toBeInTheDocument();
  expect(addProductForm).toBeInTheDocument();
});

test("Typing in add product form updates inputs", async () => {
  const addProductFormButton = await screen.findByRole("button", {name: /Add a Product/});
  await userEvent.click(addProductFormButton);
  
  const productTitle = await screen.findByRole("textbox", {name: /Product Name/});
  const productPrice = await screen.findByRole("spinbutton", {name: /Price/});
  const productQuantity = await screen.findByRole("spinbutton", {name: /Quantity/});

  await userEvent.type(productTitle, "Test");
  await userEvent.type(productPrice, "100.01");
  await userEvent.type(productQuantity, "888");
  
  expect(productTitle).toHaveValue("Test");
  expect(productPrice).toHaveValue(100.01);
  expect(productQuantity).toHaveValue(888);
});

test("Add product form updates products and hides form", async () => {
  const addProductFormButton = await screen.findByRole("button", {name: /Add a Product/});
  await userEvent.click(addProductFormButton);
  
  const addProductForm = screen.queryByRole("form");
  const productTitleInput = await screen.findByRole("textbox", {name: /Product Name/});
  const productPriceInput = await screen.findByRole("spinbutton", {name: /Price/});
  const productQuantityInput = await screen.findByRole("spinbutton", {name: /Quantity/});
  const addProductButton = await screen.findByRole("button", {name: "Add"});
  
  await userEvent.type(productTitleInput, "Test");
  await userEvent.type(productPriceInput, "100.01");
  await userEvent.type(productQuantityInput, "888");
  
  MOCKS.addProduct.mockResolvedValue({
     _id: "684222f688ad130dfccaldikl",
    title: "Test",
    price: 100.01,
    quantity: 888,
    createdAt: "2025-06-05T23:06:30.134Z",
    updatedAt: "2025-06-05T23:06:30.401Z",
    __v: 0
  });

  await userEvent.click(addProductButton);
  const newProductTitle = await screen.findByRole("heading", {name: /Test/});
  
  expect(addProductForm).not.toBeInTheDocument();
  expect(newProductTitle).toBeInTheDocument();
});

test("Clicking cancel on add product form hides form", async () => {
  const addProductFormButton = await screen.findByRole("button", {name: /Add a Product/});
  await userEvent.click(addProductFormButton);
  
  const addProductForm = screen.queryByRole("form");
  const cancelAddProductFormButton = await screen.findByRole("button", {name: "Cancel"});
  
  await userEvent.click(cancelAddProductFormButton);
  expect(addProductForm).not.toBeInTheDocument();
});

/*
THIS GROUP OF TESTS TESTS EDIT PRODUCT FORM FUNCTIONALITY
*/
test("Clicking 'Edit' displays edit product form and disables add to cart and edit buttons",
  async () => {
  const editProductFormButtons = await screen.findAllByRole("button", {name: /Edit/});
  const editFirstProductButton = editProductFormButtons[0];
  const addToCartButtons = await screen.findAllByRole("button", {name: /Add to Cart/});
  const firstAddToCartButton = addToCartButtons[0];
  
  await userEvent.click(editFirstProductButton);
  
  const editProductForm = await screen.findByRole("form");

  expect(editProductForm).toBeInTheDocument();
  expect(firstAddToCartButton).toBeDisabled();
  expect(editFirstProductButton).toBeDisabled();
});

test("Typing in edit product form updates inputs", async () => {
  const editProductFormButtons = await screen.findAllByRole("button", {name: /Edit/});
  const editFirstProductButton = editProductFormButtons[0];
  await userEvent.click(editFirstProductButton);
  
  const productTitle = await screen.findByRole("textbox", {name: /Product Name/});
  const productPrice = await screen.findByRole("spinbutton", {name: /Price/});
  const productQuantity = await screen.findByRole("spinbutton", {name: /Quantity/});


  await userEvent.clear(productTitle);
  await userEvent.clear(productPrice);
  await userEvent.clear(productQuantity);
  await userEvent.type(productTitle, "Test");
  await userEvent.type(productPrice, "100.01");
  await userEvent.type(productQuantity, "888");
  
  expect(productTitle).toHaveValue("Test");
  expect(productPrice).toHaveValue(100.01);
  expect(productQuantity).toHaveValue(888);
});

test("Edit product form udpates product and hides form", async () => {
  const editProductFormButtons = await screen.findAllByRole("button", {name: /Edit/});
  const editFirstProductButton = editProductFormButtons[0];
  await userEvent.click(editFirstProductButton);
  const editProductForm = await screen.findByRole("form");
  
  const productTitle = await screen.findByRole("textbox", {name: /Product Name/});
  const productPrice = await screen.findByRole("spinbutton", {name: /Price/});
  const productQuantity = await screen.findByRole("spinbutton", {name: /Quantity/});


  await userEvent.clear(productTitle);
  await userEvent.clear(productPrice);
  await userEvent.clear(productQuantity);
  await userEvent.type(productTitle, "Test");
  await userEvent.type(productPrice, "100.01");
  await userEvent.type(productQuantity, "888");
  
  MOCKS.updateProduct.mockResolvedValue({...MOCK_PRODUCTS[0],
    title: "Test",
    price: 100.01,
    quantity: 88,
    updatedAt: "2025-06-06T17:24:42.105Z"
  });

  const updateButton = await screen.findByRole("button", {name: /Update/});
  await userEvent.click(updateButton);
  const newFirstProductTitle = await screen.findByRole("heading", {name: /Test/});
  
  expect(editProductForm).not.toBeInTheDocument();
  expect(newFirstProductTitle).toBeInTheDocument();
});

test("Clicking cancel on edit product form hides form", async () => {
  const editProductFormButtons = await screen.findAllByRole("button", {name: /Edit/});
  const editFirstProductButton = editProductFormButtons[0];
  await userEvent.click(editFirstProductButton);
  const editProductForm = await screen.findByRole("form");
  
  const cancelEditProductFormButton = await screen.findByRole("button", {name: "Cancel"});
  
  await userEvent.click(cancelEditProductFormButton);
  expect(editProductForm).not.toBeInTheDocument();
});


/*
THESE TESTS TEST THE FUNCTIONALITY OF THE DELETE PRODUCT BUTTON
*/
test("Delete product button exists for every product", async() => {
  const deleteProductButtons = await screen.findAllByRole("button", {name: "X"})
  expect(deleteProductButtons).toHaveLength(MOCK_PRODUCTS.length);
});

test("Clicking delete product button removes product", async () => {
  const firstProductTitle = await screen.findByRole("heading", {name: "Apple iPod 14 Pro Max 256GB"});
  expect(firstProductTitle).toBeInTheDocument();
  
  const deleteProductButtons = await screen.findAllByRole("button", {name: "X"})
  const deleteFirstProductButton = deleteProductButtons[0];

  MOCKS.deleteProduct.mockResolvedValue(true);
  await userEvent.click(deleteFirstProductButton);

  expect(firstProductTitle).not.toBeInTheDocument();
});

/*
THESE TESTS TEST THE FUNCTIONALITY OF THE CHECKOUT
// */
test("Checkout clears cart for $0 total and button is disabled on empty cart", async () => {
  const cartTotal = await screen.findByText("$6499.89");
  expect(cartTotal).toBeInTheDocument();
  
  let checkoutButton = await screen.findByRole("button", {name: "Checkout"});
  
  MOCKS.checkout.mockResolvedValue(true);
  await userEvent.click(checkoutButton);
  
  const emptyCartMessage = await screen.findByText("Your cart is empty");
  checkoutButton = await screen.findByRole("button", {name: "Checkout"});
  
  expect(checkoutButton).toBeDisabled();
  expect(emptyCartMessage).toBeInTheDocument();
});

/*
THESE TEST TEST THE ADD TO CART FUNCTIONALITY
*/
test("add to cart increases cart total", async () => {
  const addToCartButtons = await screen.findAllByRole("button", {name: /Add to Cart/});
  const firstAddToCartButton = addToCartButtons[0];
  const productStartQuantity = MOCK_PRODUCTS[0].quantity;
  const productCartStartQuantity = MOCK_CART[0].quantity;

  MOCKS.addToCart.mockResolvedValue({
    product: {...MOCK_PRODUCTS[0], quantity: productStartQuantity - 1},
    item: {...MOCK_CART[0], quantity: productCartStartQuantity + 1},
  });

  await userEvent.click(firstAddToCartButton);
  const cartTotal = await screen.findByText("$7399.88");

  expect(cartTotal).toBeInTheDocument();
});
