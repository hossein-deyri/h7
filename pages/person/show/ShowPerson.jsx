import { useContext } from "react";
import { RoleContext } from "utilize/contexts/roleContext";
import "./style.css";

import ItemList from "components/content/ItemList";
import {
  CONST_DESCRIPTION,
  CONST_FEMALE,
  CONST_GENDER,
  CONST_IMAGE_PATH,
  CONST_IMDB_CODE,
  CONST_INSTAGRAM_LINK,
  CONST_MALE,
  CONST_NAME,
  CONST_PERSONS,
  CONST_TRANSLATED_NAME,
} from "utilize/constant/constants";

export const ShowPerson = () => {
  const roles = useContext(RoleContext);

  return (
    <>
      <ItemList
        api={CONST_PERSONS}
        title="لیست اشخاص"
        itemType="شخص"
        creatingMode={true}
        searchIn={["name", "translatedName"]}
        createRole={roles?.includes("ROLE_CAN_CREATE_PERSON")}
        editRole={roles?.includes("ROLE_CAN_UPDATE_PERSON")}
        deleteRole={roles?.includes("ROLE_CAN_DELETE_PERSON")}
        item={[
          {
            name: CONST_NAME,
            type: "text",
            persianName: "نام فارسی ",
            required: true,
          },
          {
            name: CONST_TRANSLATED_NAME,
            type: "text",
            persianName: "نام دیگر",
            required: true,
          },
          { name: CONST_IMDB_CODE, type: "text", persianName: "کد imdb" },
          {
            name: CONST_DESCRIPTION,
            type: "textarea",
            persianName: "بیوگرافی",
            required: true,
          },
          {
            name: CONST_IMAGE_PATH,
            type: "image",
            persianName: "تصویر(200x200)",
          },
          {
            name: CONST_GENDER,
            type: "dropdown",
            persianName: "جنسیت",
            options: [
              { label: "مرد", value: CONST_MALE },
              { label: "زن", value: CONST_FEMALE },
            ],
            required: true,
          },
          {
            name: CONST_INSTAGRAM_LINK,
            type: "text",
            persianName: "آدرس اینستاگرام",
            required: false,
          },
        ]}
      />
    </>
  );
};

export default ShowPerson;
