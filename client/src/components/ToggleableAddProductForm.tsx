import React from "react";
import AddProductForm from "./AddProductForm";
import { ProductReducerArg } from "../productsReducer";

interface ToggleableAddProductFormProps {
  productsDispatch: React.ActionDispatch<[arg: ProductReducerArg]>;
}

function ToggleableAddProductForm({ productsDispatch }: ToggleableAddProductFormProps) {
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
      productsDispatch={productsDispatch}
    />
  );
}

export default ToggleableAddProductForm;