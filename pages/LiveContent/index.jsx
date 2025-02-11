import ItemList from "components/content/ItemList";
import { RoleContext } from "utilize/contexts/roleContext";
import React, { useContext } from "react";
import {
  CONST_ACTIVE,
  CONST_END_DATE_TIME,
  CONST_IMAGE_PATH,
  CONST_LINK,
  CONST_NAME,
  CONST_START_DATE_TIME,
} from "utilize/constant/constants";
import { endpoints } from "endpoints";

const LiveContent = () => {
  const roles = useContext(RoleContext);

  return (
    <>
      <ItemList
        api={endpoints.LIVES}
        title="لیست برنامه های رویداد"
        itemType="برنامه  رویداد"
        creatingMode={true}
        createRole={roles?.includes("ROLE_CAN_CREATE_LIVE")}
        editRole={roles?.includes("ROLE_CAN_UPDATE_LIVE")}
        deleteRole={roles?.includes("ROLE_CAN_DELETE_LIVE")}
        item={[
          {
            name: CONST_NAME,
            type: "text",
            persianName: "نام برنامه",
            required: true,
          },
          {
            name: CONST_LINK,
            type: "text",
            persianName: "لینک ورودی",
            required: true,
          },
          { name: CONST_ACTIVE, type: "boolean", persianName: "فعال" },
          {
            name: CONST_IMAGE_PATH,
            type: "image",
            persianName: "تصویر برنامه",
            className: "d-none",
          },
          {
            name: CONST_START_DATE_TIME,
            type: "dateTimePicker",
            persianName: "شروع برنامه",
          },
          {
            name: CONST_END_DATE_TIME,
            type: "dateTimePicker",
            persianName: "پایان برنامه",
          },
        ]}
      />
    </>
  );
};

export default LiveContent;
