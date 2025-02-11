import React from "react";
import { ProductDetailsStyles } from "./productDetailsStyles";
import ProductDetailsTable from "./component/productDetailsTable/ProductDetailsTable";
import DescriptionItem from "components/common/descriptionItem/DescriptionItem";
import useProductDetails from "./useProductDetails";

const ProductDetails = ({ productID }) => {
  const { items, isLoading } = useProductDetails({ productID });

  return (
    <ProductDetailsStyles>
      <h3>جزئیات فروش</h3>
      <DescriptionItem
        items={items.fields}
        imgSrc={items.src}
        isLoading={isLoading}
      />
      <h3>لیست فروش:</h3>
      <ProductDetailsTable productID={productID} />
    </ProductDetailsStyles>
  );
};

export default ProductDetails;
