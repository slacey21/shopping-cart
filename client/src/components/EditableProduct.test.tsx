import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditableProduct from './EditableProduct';

const mockProducts = [
  {
    _id: "61d754d72092473d55a809e1",
    title: "Kindle",
    price: 50,
    quantity: 2,
    createdAt: "2020-10-04T05:57:02.777Z",
    updatedAt: "2020-10-04T05:57:02.777Z",
    __v: 0
  }
];

const mockCart = [
  {
    _id: "545454f72092473d55a809e1",
    title: "Kindle",
    price: 50,
    quantity: 1,
    productId: "61d754d72092473d55a809e1",
    createdAt: "2020-10-04T05:57:02.777Z",
    updatedAt: "2020-10-04T05:57:02.777Z",
    __v: 0
  }
];

test("clicking 'Edit' button displays edit product form", async () => {
  render(<EditableProduct
          product={mockProducts[0]}
          products={mockProducts}
          cart={mockCart}
          setProducts={vi.fn()}
          setCart={vi.fn()}
        />);
  
  await userEvent.click(screen.getByRole("button", {name: "Edit"}));
  const editProductForm = await screen.getByRole("form");
  
  expect(editProductForm).toBeInTheDocument();
})

test("clicking 'Cancel' on edit product form hides form and shows edit product button", async () => {
   render(<EditableProduct
          product={mockProducts[0]}
          products={mockProducts}
          cart={mockCart}
          setProducts={vi.fn()}
          setCart={vi.fn()}
        />);
  
  // show edit product form
  await userEvent.click(screen.getByRole("button", {name: "Edit"}));
  const editProductForm = await screen.getByRole("form");
  
  expect(editProductForm).toBeInTheDocument();
  
  // click cancel to hide edit form
  await userEvent.click(screen.getByRole("button", {name: "Cancel"}))
  const editProductButton = await screen.getByRole("button", {name: "Edit"})
  
  expect(editProductButton).toBeInTheDocument();
  expect(screen.queryByRole("form")).not.toBeInTheDocument();
})
