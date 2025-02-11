import React from "react";
import ItemList from "components/content/ItemList";
import {
  CONST_PAYMENT_STATUS,
  CONST_PRICE,
  CONST_PURCHASE_DATE,
  CONST_COMPLETION_DATE,
  CONST_PURCHASE_TIME,
  CONST_COMPLETION_TIME,
  CONST_MOBILE,
} from "utilize/constant/constants";
import { endpoints } from "endpoints";

export const ProductDetailsTable = ({ productID }) => {
  return (
    <>
      <ItemList
        api={endpoints.PRODUCT_SALES_LIST({ productID })}
        productID={productID}
        itemType="محصول"
        item={[
          {
            name: CONST_MOBILE,
            persianName: "شماره موبایل",
            style: { width: "130px" },
          },
          {
            name: CONST_PURCHASE_DATE,
            persianName: "تاریخ خرید",
            style: { width: "130px" },
          },

          {
            name: CONST_PURCHASE_TIME,
            persianName: "زمان خرید",
            style: { width: "130px" },
          },
          {
            name: CONST_PRICE,
            persianName: "مبلغ",
            style: { width: "130px" },
          },
          {
            name: CONST_COMPLETION_DATE,
            persianName: "تاریخ اتمام",
            style: { width: "130px" },
          },
          {
            name: CONST_COMPLETION_TIME,
            persianName: "زمان اتمام",
            style: { width: "130px" },
          },
          {
            name: CONST_PAYMENT_STATUS,
            persianName: "وضعیت",
            style: { width: "130px" },
          },
        ]}
      />
    </>
  );
};

export default ProductDetailsTable;
