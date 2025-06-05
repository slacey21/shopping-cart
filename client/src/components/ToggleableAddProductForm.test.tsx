import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToggleableAddProductForm from './ToggleableAddProductForm';

test("clicking 'Add Product' displays add product form", async () => {
  render(<ToggleableAddProductForm setProducts={vi.fn()} />);
  
  await userEvent.click(screen.getByRole("button", {name: "Add a Product"}));
  const addProductForm = await screen.getByRole("form");
  
  expect(addProductForm).toBeInTheDocument();
})

test("clicking 'Cancel' on add product form hides form and shows add product button", async () => {
  render(<ToggleableAddProductForm setProducts={vi.fn()} />);
  
  // show add product form
  await userEvent.click(screen.getByRole("button", {name: "Add a Product"}));
  const addProductForm = await screen.getByRole("form");
  
  expect(addProductForm).toBeInTheDocument();
  
  // click cancel to hide form
  await userEvent.click(screen.getByRole("button", {name: "Cancel"}))
  const addProductButton = await screen.getByRole("button", {name: "Add a Product"})
  
  expect(addProductButton).toBeInTheDocument();
  expect(screen.queryByRole("form")).not.toBeInTheDocument();
})

