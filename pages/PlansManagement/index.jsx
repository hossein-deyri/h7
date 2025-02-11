import React, { useContext, useEffect, useState } from "react";
import { RoleContext } from "utilize/contexts/roleContext";

import {
  CONST_NAME,
  CONST_PLAN_PRICE,
  CONST_UPLOAD_LOGO,
  CONST_DESCRIPTION,
  CONST_VALIDITY_PERIOD,
  CONST_DEFAULT_DISCOUNT,
  CONST_UPLOAD_SPECIAL_LOGO,
  CONST_IMAGE_PATH,
  CONST_ACTIVE,
  CONST_STATUS,
  CONST_DISCOUNT_CODE,
} from "utilize/constant/constants";
import { endpoints } from "endpoints";
import ItemList from "components/content/ItemList";
import getDiscounts from "services/discountServices/getDiscounts";

const PlansPage = () => {
  const roles = useContext(RoleContext);
  const [discountCodes, setDiscountCodes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getDiscounts();
        const noDiscount = {
          label: "بدون تخفیف",
          value: null,
        };
        const discounts = data
          .filter(({ status }) => status === "ACTIVE")
          .map(({ code, name }) => ({
            label: name,
            value: code,
          }));
        const mergedObjs = [noDiscount, ...discounts];
        setDiscountCodes(mergedObjs);
      } catch (err) {
        return Promise.reject(err);
      }
    })();
  }, []);
  return (
    <ItemList
      api={endpoints.PLANS["/"]}
      title="لیست بسته ها"
      itemType="بسته"
      creatingMode={true}
      createRole={roles?.includes("ROLE_CAN_CREATE_PLAN")}
      editRole={roles?.includes("ROLE_CAN_UPDATE_PLAN")}
      deleteRole={roles?.includes("ROLE_CAN_DELETE_PLAN")}
      // assignRole={true}
      item={[
        {
          name: CONST_NAME,
          type: "text",
          persianName: "نام",
          required: true,
        },
        {
          name: CONST_VALIDITY_PERIOD,
          type: "dropdown",
          persianName: "مدت زمان اعتبار",
          options: [
            { label: "یک ماهه", value: "ONE_MONTH" },
            { label: "سه ماهه", value: "THREE_MONTH" },
            { label: "شش ماهه", value: "SIX_MONTH" },
          ],
          required: true,
        },
        {
          name: CONST_PLAN_PRICE,
          type: "text",
          persianName: "قیمت",
          required: false,
        },
        {
          name: CONST_DISCOUNT_CODE,
          type: "dropdown",
          persianName: "کد تخفیف",
          options: discountCodes,
          required: false,
        },
        {
          name: CONST_IMAGE_PATH,
          type: "image",
          persianName: "لوگو",
          required: false,
        },
        {
          name: CONST_STATUS,
          type: "boolean",
          persianName: "وضعیت",
          required: false,
        },
        // {
        //   name: CONST_UPLOAD_SPECIAL_LOGO,
        //   type: "image",
        //   persianName: "نشان ویژه",
        //   required: false,
        // },
        {
          name: CONST_DESCRIPTION,
          type: "text",
          persianName: "توضیحات",
          required: true,
          className: "d-none",
        },
      ]}
    />
  );
};

export default PlansPage;
