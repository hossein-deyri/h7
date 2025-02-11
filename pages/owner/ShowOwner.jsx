import React, { useContext } from "react";
import { RoleContext } from "utilize/contexts/roleContext";

import ItemList from "components/content/ItemList";
import {
  CONST_DESCRIPTION,
  CONST_NAME,
  CONST_OWNERS,
  CONST_TRANSLATED_NAME,
} from "utilize/constant/constants";

export const ShowOwner = () => {
  const roles = useContext(RoleContext);

  return (
    <>
      <ItemList
        api={CONST_OWNERS}
        title="لیست مالکان"
        itemType="مالک"
        creatingMode={true}
        searchIn={["name", "translatedName"]}
        checkBySearch
        createRole={roles?.includes("ROLE_CAN_CREATE_OWNER")}
        editRole={roles?.includes("ROLE_CAN_UPDATE_OWNER")}
        deleteRole={roles?.includes("ROLE_CAN_DELETE_OWNER")}
        item={[
          {
            name: CONST_NAME,
            type: "text",
            persianName: "نام فارسی",
            required: true,
          },
          {
            name: CONST_TRANSLATED_NAME,
            type: "text",
            persianName: "نام لاتین",
            required: true,
          },
          {
            name: CONST_DESCRIPTION,
            type: "textarea",
            persianName: "توضیحات",
            required: true,
          },
        ]}
      />
    </>
  );
};

export default ShowOwner;
