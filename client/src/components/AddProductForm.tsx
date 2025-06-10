import React from "react";
import { addProduct } from "../services/api";
import { ProductReducerAction, ProductActions } from "../reducers/productsReducer";

interface AddProductFormProps {
  onShowAddProduct: () => void;
  productsDispatch: React.ActionDispatch<[arg: ProductReducerAction]>;
}

function AddProductForm({ onShowAddProduct, productsDispatch }: AddProductFormProps) {
  const defaultForm = {
    title: "",
    price: 0,
    quantity: 0,
  };
  const [formValues, setFormValues] = React.useState(defaultForm);

  const handleFormValueChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string): void => {
    const value = e.target.value;
    setFormValues({...formValues, [fieldName]: value});
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    (async () => {
      try {
        const newlyAddedProduct = await addProduct(formValues);
        productsDispatch(ProductActions.AddProduct(newlyAddedProduct));
        setFormValues(defaultForm);
        onShowAddProduct();
      } catch (e: unknown) {
        console.log(e);
      }
    })();
  };


  return (
    <div className="add-form">
      <form onSubmit={(e) => handleFormSubmit(e)} aria-label="form">
        <div className="input-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text" 
            id="product-name"
            name="product-name"
            required
            value={formValues.title}
            onChange={(e) => handleFormValueChange(e, "title")}
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input
            type="number"
            id="product-price"
            name="product-price"
            min={0}
            step={0.01}
            required
            value={formValues.price}
            onChange={(e) => handleFormValueChange(e, "price")}
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input
            type="number"
            id="product-quantity"
            name="product-quantity"
            min={0}
            required
            value={formValues.quantity}
            onChange={(e) => handleFormValueChange(e, "quantity")}
          />
        </div>
        <div className="actions form-actions">
          <button type="submit">Add</button>
          <button type="submit" onClick={onShowAddProduct}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddProductForm;