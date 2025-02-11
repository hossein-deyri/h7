import React, { useContext } from "react";
import { RoleContext } from "utilize/contexts/roleContext";

import ItemList from "components/content/ItemList";
import {
  CONST_MOBILE,
  CONST_SIGNIN_DATE,
  CONST_SUBSCRIBER_PLAN,
  CONST_PRICE_CUSTOMER_SUBSCRIPTION,
  CONST_STATUS_NEW,
} from "utilize/constant/constants";
import { endpoints } from "endpoints";

export default function CustomerSubscription() {
  const roles = useContext(RoleContext);

  return (
    <ItemList
      api={endpoints.V2.SUBSUCRIPTION}
      title="لیست اشتراک ها"
      itemType="اشتراک"
      creatingMode={true}
      searchIn={["name", "translatedName"]}
      checkBySearch
      createRole={roles?.includes("ROLE_CAN_CREATE_SUBSCRIPTION")}
      editRole={roles?.includes("ROLE_CAN_UPDATE_SUBSCRIPTION")}
      deleteRole={roles?.includes("ROLE_CAN_DELETE_SUBSCRIPTION")}
      item={[
        {
          name: CONST_MOBILE,
          type: "text",
          persianName: "شماره موبایل",
          required: true,
        },
        {
          name: CONST_SIGNIN_DATE,
          type: "text",
          persianName: "تاریخ شروع",
          required: true,
        },

        {
          name: CONST_SUBSCRIBER_PLAN,
          type: "text",
          persianName: "نوع اشتراک",
          required: true,
        },
        {
          name: CONST_STATUS_NEW,
          type: "text",
          persianName: "پرداخت",
          required: true,
        },
        // {
        //   name: CONST_REMAINING_TIME,
        //   type: "text",
        //   persianName: "مدت زمان اشتراک باقیمانده",
        //   required: true,
        // },
        {
          name: CONST_PRICE_CUSTOMER_SUBSCRIPTION,
          type: "text",
          persianName: "مبلغ نهایی",
          required: true,
        },
      ]}
    />
  );
}
