import ItemList from "components/content/ItemList";
import { roleList } from "utilize/data/data";
import { RoleContext } from "utilize/contexts/roleContext";
import React, { useContext } from "react";
import { CONST_NAME, CONST_ROLES } from "utilize/constant/constants";
import { endpoints } from "endpoints";

const RolePage = () => {
  const roles = useContext(RoleContext);

  return (
    <ItemList
      api={endpoints.ROLES}
      title="لیست دسترسی ها"
      itemType="دسترسی"
      creatingMode={true}
      createRole={roles?.includes("ROLE_CAN_CREATE_ROLE")}
      editRole={roles?.includes("ROLE_CAN_UPDATE_ROLE")}
      deleteRole={roles?.includes("ROLE_CAN_DELETE_ROLE")}
      assignRole={roles?.includes("ROLE_CAN_UPDATE_AUTHORITY")}
      item={[
        {
          name: CONST_NAME,
          type: "text",
          persianName: "نام فارسی",
          required: true,
        },
        {
          name: CONST_ROLES,
          type: "roles",
          personName: "سطوح دسترسی",
          roleList: roleList,
        },
      ]}
    />
  );
};

export default RolePage;
