import "./ShowCountriesStyle.js";
import { RoleContext } from "utilize/contexts/roleContext";
import React, { useContext } from "react";

import ItemList from "components/content/ItemList";
import {
  CONST_CODE,
  CONST_COUNTRIES,
  CONST_NAME,
} from "utilize/constant/constants.js";

export const ShowCountries = () => {
  const roles = useContext(RoleContext);

  return (
    <>
      <ItemList
        api={CONST_COUNTRIES}
        title="لیست کشورها"
        itemType="کشور"
        searchIn={["code", "flag"]}
        createRole={roles?.includes("ROLE_CAN_CREATE_COUNTRY")}
        editRole={roles?.includes("ROLE_CAN_UPDATE_COUNTRY")}
        deleteRole={roles?.includes("ROLE_CAN_DELETE_COUNTRY")}
        //** item is an array that contains each one of the fields, i've commented some of available fields */
        item={[
          {
            name: CONST_CODE,
            type: "text",
            persianName: "کد کشور",
            required: true,
          },
          {
            name: CONST_NAME,
            type: "text",
            persianName: "اسم کشور",
            required: true,
          },
        ]}
      />
    </>
  );
};

export default ShowCountries;
