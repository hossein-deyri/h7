import ItemList from "components/content/ItemList";
import { RoleContext } from "utilize/contexts/roleContext";
import React, { useContext } from "react";
import {
  CONST_CHANNELS,
  CONST_IMAGE_PATH,
  CONST_NAME,
} from "utilize/constant/constants";

const ShowChannel = ({ setNavSideMenu, setProductID }) => {
  const roles = useContext(RoleContext);

  return (
    <ItemList
      isChannel={true}
      api={CONST_CHANNELS}
      title="لیست شبکه ها"
      itemType="شبکه"
      creatingMode={false}
      productNavSetter={setNavSideMenu}
      productSetID={setProductID}
      createRole={roles?.includes("ROLE_CAN_CREATE_CHANNEL")}
      editRole={roles?.includes("ROLE_CAN_UPDATE_CHANNEL")}
      deleteRole={roles?.includes("ROLE_CAN_DELETE_CHANNEL")}
      item={[
        { name: CONST_NAME, type: "text", persianName: "نام شبکه" },
        { name: CONST_IMAGE_PATH, type: "image", persianName: "لوگوی شبکه" },
      ]}
    />
  );
};

export default ShowChannel;
