import React, { useContext } from "react";
import { RoleContext } from "utilize/contexts/roleContext";

import {
  CONST_NAME,
  CONST_DISCOUNT_TYPE,
  CONST_DISCOUNT_CODE,
  CONST_DISCOUNT_AMOUNT,
  CONST_DISCOUNT_ACTIVE_DATE_TO,
  CONST_DISCOUNT_ACTIVE_DATE_FROM,
  CONST_DISCOUNT_STATUS,
} from "utilize/constant/constants";
import { endpoints } from "endpoints";
import ItemList from "components/content/ItemList";

const DiscountManagement = () => {
  const roles = useContext(RoleContext);

  return (
    <ItemList
      api={endpoints.DISCOUNTS["/"]}
      title="لیست تخفیف ها"
      itemType="کد تخفیف"
      creatingMode={true}
      createRole={roles?.includes("ROLE_CAN_CREATE_DISCOUNT")}
      editRole={roles?.includes("ROLE_CAN_UPDATE_DISCOUNT")}
      deleteRole={roles?.includes("ROLE_CAN_DELETE_DISCOUNT")}
      // assignRole={true}
      item={[
        {
          name: CONST_NAME,
          type: "text",
          persianName: "نام",
          required: true,
        },
        {
          name: CONST_DISCOUNT_CODE,
          type: "text",
          persianName: "کد",
          required: false,
        },
        {
          name: CONST_DISCOUNT_TYPE,
          type: "dropdown",
          persianName: "نوع",
          options: [
            { label: "درصد", value: "PERCENTAGE" },
            { label: "ثابت", value: "FIX" },
          ],
          required: true,
          className: "d-none",
        },
        {
          name: CONST_DISCOUNT_AMOUNT,
          type: "text",
          persianName: "مقدار",
          required: true,
        },
        {
          name: CONST_DISCOUNT_STATUS,
          type: "dropdown",
          persianName: "وضعیت",
          options: [
            { label: "فعال", value: "ACTIVE" },
            { label: "غیرفعال", value: "INACTIVE" },
          ],
          required: true,
        },
        {
          name: CONST_DISCOUNT_ACTIVE_DATE_FROM,
          type: "dateTimePicker",
          persianName: "تاریخ شروع",
          required: true,
        },
        {
          name: CONST_DISCOUNT_ACTIVE_DATE_TO,
          type: "dateTimePicker",
          persianName: "تاریخ پایان",
          required: true,
        },
      ]}
    />
  );
};

export default DiscountManagement;
