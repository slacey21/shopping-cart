import { updateProduct } from "../services/api";
import { Product } from "../types/index";
import React from "react";
import { ProductReducerAction, ProductActions } from "../reducers/productsReducer";

interface EditProductFormProps {
  products: Product[];
  productId: string;
  onToggleEditProductForm: (status: boolean) => void;
  productsDispatch: React.ActionDispatch<[action: ProductReducerAction]>;
}

function EditProductForm({
  products,
  productId,
  onToggleEditProductForm,
  productsDispatch
}: EditProductFormProps) {
  const product = products.find(product => product._id === productId) as Product;
  const [formValues, setFormValues] = React.useState<Product>(product);

  const handleUpdateFormValue = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string): void => {
    e.preventDefault();
    const fieldValue = e.target.value;
    setFormValues({...formValues, [fieldName]: fieldValue});
  };
  
  const handleUpdateProduct = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    (async () => {
      try {
        const newValues = {...product, ...formValues};
        const newProduct = await updateProduct(newValues);
        productsDispatch(ProductActions.UpdateProduct(newProduct));
        onToggleEditProductForm(false);
      } catch (e) {
        console.log(e);
      }
    })();
    
  };
  
  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form onSubmit={(e) => handleUpdateProduct(e)} aria-label="form">
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={formValues.title}
            onChange={(e) => handleUpdateFormValue(e, "title")}
            aria-label="Product Name"
            />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            min={0}
            step={.01}
            id="product-price"
            value={formValues.price}
            onChange={(e) => handleUpdateFormValue(e, "price")}
            aria-label="Product Price"
            />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            min={0}
            step={1}
            id="product-quantity"
            value={formValues.quantity}
            onChange={(e) => handleUpdateFormValue(e, "quantity")}
            aria-label="Product Quantity"
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={() => onToggleEditProductForm(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditProductForm;