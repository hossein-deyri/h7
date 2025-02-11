import { useState, useEffect, useContext } from "react";
import { RoleContext } from "utilize/contexts/roleContext";
import ItemList from "components/content/ItemList";
import {
  CONST_EMAIL,
  CONST_FIRST_NAME,
  CONST_LAST_NAME,
  CONST_SIGNIN_DATE,
  CONST_PASSWORD,
  CONST_ACCESS,
  CONST_MOBILE,
} from "utilize/constant/constants";
import { endpoints } from "endpoints";
import { get } from "services/httpService";

export const Subscribers = ({ setNavSideMenu, setProductID }) => {
  const initialRoles = useContext(RoleContext);
  const [roles, serRoles] = useState([]);
  const [createUser, setCreateUser] = useState(false);

  const createRole = initialRoles?.includes("ROLE_CAN_CREATE_USER");
  const editRole = initialRoles?.includes("ROLE_CAN_UPDATE_USER");
  const deleteRole = initialRoles?.includes("ROLE_CAN_DELETE_USER");

  useEffect(() => {
    (async () => {
      const { data } = await get(endpoints.ROLES);
      const rolesOptions = data.data.map(({ name }) => ({
        label: name,
        value: name,
      }));
      serRoles(rolesOptions);
    })();
  }, []);

  return (
    <ItemList
      api={endpoints.USERS["/"]}
      title="لیست کاربران"
      itemType="کاربران"
      creatingMode={true}
      searchIn={["name", "translatedName"]}
      checkBySearch
      productNavSetter={setNavSideMenu}
      productSetID={setProductID}
      {...{
        createRole,
        editRole,
        deleteRole,
        setCreateUser,
      }}
      item={[
        {
          name: CONST_MOBILE,
          type: "text",
          persianName: "شماره موبایل",
          required: true,
          readOnly: !createUser,
        },
        {
          name: CONST_PASSWORD,
          type: "text",
          persianName: "گذرواژه",
          required: createUser,
          className: "d-none",
          readOnly: false,
        },
        {
          name: CONST_FIRST_NAME,
          type: "text",
          persianName: "نام",
          required: false,
          readOnly: false,
        },
        {
          name: CONST_LAST_NAME,
          type: "text",
          persianName: "نام خانوادگی",
          required: false,
          readOnly: false,
        },
        {
          name: CONST_SIGNIN_DATE,
          type: "text",
          persianName: "زمان ثبت نام",
          required: false,
          readOnly: false,
        },
        {
          name: CONST_EMAIL,
          type: "text",
          persianName: "ایمیل",
          required: false,
          readOnly: false,
        },
        {
          name: CONST_ACCESS,
          type: "dropdown",
          options: roles,
          persianName: "دسترسی",
          className: "d-none",
          required: true,
          readOnly: false,
        },
      ]}
    />
  );
};

export default Subscribers;
