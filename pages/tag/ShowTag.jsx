import ItemList from "components/content/ItemList";
import { RoleContext } from "utilize/contexts/roleContext";
import React, { useContext } from "react";
import {
  CONST_DESCRIPTION,
  CONST_FIXED,
  CONST_INVISIBLE,
  CONST_NAME,
  CONST_TAGS,
  CONST_TRANSLATED_NAME,
} from "utilize/constant/constants";

const ShowTag = () => {
  const roles = useContext(RoleContext);
  return (
    <>
      <ItemList
        api={CONST_TAGS}
        title="لیست تگ ها"
        itemType="تگ"
        searchIn={["name", "translatedName"]}
        createRole={roles?.includes("ROLE_CAN_CREATE_TAG")}
        editRole={roles?.includes("ROLE_CAN_UPDATE_TAG")}
        deleteRole={roles?.includes("ROLE_CAN_DELETE_TAG")}
        //** item is an array that contains each one of the fields, i've commented some of available fields */
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
            persianName: "نام انگلیسی",
            required: true,
          },
          {
            name: CONST_DESCRIPTION,
            type: "textarea",
            persianName: "توضیحات تگ",
          },
          { name: CONST_FIXED, type: "boolean", persianName: "تگ اصلی" },
          { name: CONST_INVISIBLE, type: "boolean", persianName: "تگ پنهان" },
        ]}
      />
    </>
  );
};

export default ShowTag;
