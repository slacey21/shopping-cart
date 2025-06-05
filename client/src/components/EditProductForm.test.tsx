import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditProductForm from './EditProductForm';

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

test("typing in the edit product form works for all fields", async () => {
  render(<EditProductForm
          products={mockProducts}
          productId={mockProducts[0]._id}
          onToggleEditProductForm={vi.fn()}
          setProducts={vi.fn()}
        />);

  const titleInput = screen.getByRole("textbox", {name: "Product Name"});
  const priceInput = screen.getByRole("spinbutton", {name: "Product Price"});
  const quantityInput = screen.getByRole("spinbutton", {name: "Product Quantity"});

  userEvent.clear(titleInput);
  userEvent.clear(priceInput);
  userEvent.clear(quantityInput);

  await userEvent.type(titleInput, "This is a test");
  await userEvent.type(priceInput, "99.99");
  await userEvent.type(quantityInput, "1000");
  
  expect(titleInput).toHaveValue("This is a test");
  expect(priceInput).toHaveValue(99.99);
  expect(quantityInput).toHaveValue(1000);
});