import React from "react";
import AddProductForm from "./AddProductForm";
import { Product } from "../types";

interface ToggleableAddProductFormProps {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

function ToggleableAddProductForm({ setProducts }: ToggleableAddProductFormProps) {
  const [addProductShown, setAddProductShown] = React.useState<boolean>(false);
  
  const handleShowAddProductForm = () => {
    setAddProductShown(!addProductShown);
  }
  
  if (!addProductShown) {
    return (
      <>
        <button onClick={handleShowAddProductForm}>Add a Product</button> 
      </>
    )
  }

  return (
    <AddProductForm
      onShowAddProduct={handleShowAddProductForm}
      setProducts={setProducts}
    />
  );
}

export default ToggleableAddProductForm;