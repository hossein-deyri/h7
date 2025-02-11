import ItemList from "components/content/ItemList";
import { RoleContext } from "utilize/contexts/roleContext";
import React, { useContext } from "react";
import {
  CONST_ACTIVE,
  CONST_CUSTOMERS,
  CONST_EMAIL,
  CONST_FAMILY,
  CONST_GENDER,
  CONST_MOBILE,
  CONST_NAME,
  CONST_USER_NAME,
} from "utilize/constant/constants";
import { endpoints } from "endpoints";

const Customer = () => {
  const roles = useContext(RoleContext);

  return (
    <ItemList
      api={endpoints.USERS["/"]}
      title="لیست کاربران سایت"
      itemType="کاربر سایت"
      createRole={roles?.includes("ROLE_CAN_CREATE_USER")}
      editRole={roles?.includes("ROLE_CAN_UPDATE_USER")}
      deleteRole={roles?.includes("ROLE_CAN_DELETE_USER")}
      item={[
        { name: CONST_USER_NAME, type: "text", persianName: "نام کاربری" },
        // { name: CONST_NAME, type: "text", persianName: "نام" },
        { name: CONST_FAMILY, type: "text", persianName: "نام و نام خانوادگی" },
        { name: CONST_MOBILE, type: "text", persianName: "شماره موبایل" },
        // { name: CONST_EMAIL, type: "text", persianName: "ایمیل کاربر" },
        { name: CONST_EMAIL, type: "text", persianName: "سمت شغلی" },
        { name: CONST_ACTIVE, type: "boolean", persianName: "فعال" },
        {
          name: CONST_GENDER,
          type: "dropdown",
          persianName: "جنسیت",
          options: [
            { label: "مرد", value: "MALE" },
            { label: "زن", value: "FEMALE" },
          ],
        },
      ]}
    />
  );
};

export default Customer;
