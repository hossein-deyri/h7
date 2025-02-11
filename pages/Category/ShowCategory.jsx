import React, { useContext } from "react";
import { RoleContext } from "utilize/contexts/roleContext";
import ItemList from "components/content/ItemList";
import {
  CONST_TAGS,
  NAV_SIDE,
  CONST_IMAGE_PATH,
  CONST_NAME,
} from "utilize/constant/constants";
import { endpoints } from "endpoints";

export default function ShowCategory({ setNavSideMenu, setProductID }) {
  const roles = useContext(RoleContext);

  return (
    <>
      <ItemList
        api={endpoints.SETTINGS.MAINPAGE.CATEGORIES()}
        title="لیست دسته بندی"
        itemType="دسته بندی"
        creatingMode={false}
        searchIn={[CONST_NAME]}
        checkBySearch
        createRole={roles?.includes("ROLE_CAN_CREATE_PRODUCT")}
        editRole={roles?.includes("ROLE_CAN_UPDATE_PRODUCT")}
        deleteRole={roles?.includes("ROLE_CAN_DELETE_PRODUCT")}
        rootDesired={NAV_SIDE.MENU.ADD_CATEGORY}
        productNavSetter={setNavSideMenu}
        productSetID={setProductID}
        item={[
          {
            name: CONST_NAME,
            type: "text",
            persianName: "نام",
            required: true,
          },
          {
            name: CONST_IMAGE_PATH,
            type: "image",
            persianName: "تصویر",
            required: true,
          },
          {
            name: CONST_TAGS,
            type: "text",
            persianName: "تگ ها",
            required: true,
          },
        ]}
      />
    </>
  );
}
