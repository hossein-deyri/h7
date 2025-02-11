import { productTypeOptions } from "utilize/data/data";
import { useContext } from "react";
import { RoleContext } from "utilize/contexts/roleContext";
import ItemList from "components/content/ItemList";
import {
  CONST_CATEGORY,
  CONST_NAME,
  CONST_PRODUCTION_YEAR,
  CONST_PRODUCTS,
  CONST_SCREENING_STATE,
  CONST_STATE,
  CONST_SUBSCRIPTION_TYPE,
  CONST_TRANSLATED_NAME,
} from "utilize/constant/constants";

export const ShowContent = ({ setNavSideMenu, setProductID, notPublished }) => {
  const roles = useContext(RoleContext);

  return (
    <ItemList
      api={CONST_PRODUCTS}
      title="لیست محصولات"
      itemType="محصول"
      //** toggling editing mode  */
      // rowEditing={true}
      //** you can create new item with this option */
      creatingMode={false}
      //** list of items that will search in them */
      searchIn={["name", "translatedName", "productionYear"]}
      productSetID={setProductID}
      productNavSetter={setNavSideMenu}
      notPublished={notPublished}
      createRole={roles?.includes("ROLE_CAN_CREATE_PRODUCT")}
      editRole={roles?.includes("ROLE_CAN_UPDATE_PRODUCT")}
      deleteRole={roles?.includes("ROLE_CAN_DELETE_PRODUCT")}
      //** item is an array that contains each one of the fields, i've commented some of available fields */
      //** you can pass a className for className of each column and also a object as style to pass each column a custom style */
      item={[
        {
          name: CONST_NAME,
          type: "text",
          persianName: "عنوان فارسی",
          required: true,
        },
        {
          name: CONST_TRANSLATED_NAME,
          type: "text",
          persianName: "عنوان لاتین",
          required: true,
        },
        {
          name: CONST_PRODUCTION_YEAR,
          type: "number",
          persianName: "سال ساخت",
          required: true,
        },
        {
          name: CONST_CATEGORY,
          type: "dropdown",
          persianName: "نوع محصول",
          options: productTypeOptions,
          required: true,
        },
        {
          name: CONST_STATE,
          type: "text",
          persianName: "وضعیت",
          required: true,
        },
        {
          name: CONST_SUBSCRIPTION_TYPE,
          type: "text",
          persianName: "نوع خرید",
          required: true,
          style: { width: "140px" },
        },
        {
          name: CONST_SCREENING_STATE,
          type: "text",
          persianName: "وضعیت اکران",
          required: true,
        },
      ]}
    />
  );
};

export default ShowContent;
