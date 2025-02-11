import React from "react";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { CreateAdCustomersStyles } from "./CreateAdCustomersStyles";
import { NAV_SIDE } from "utilize/constant/constants";
import useCreateAdCustomers from "./useCreateAdCustomers";

const CreateAdCustomers = ({ setNavSideMenu, productID }) => {
  const {
    values,
    errors,
    touched,
    isSubmitDisabled,
    handleSubmit,
    handleInputChange,
    handleBlur,
    handleMobileChange,
  } = useCreateAdCustomers({ productID, setNavSideMenu });

  return (
    <CreateAdCustomersStyles>
      <h2>افزودن مشتری جدید</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">عنوان آگهی‌دهنده:</label>
          <InputText
            id="name"
            name="name"
            maxLength={70}
            value={values.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="لطفاً عنوان آگهی‌دهنده را وارد نمایید"
            className={errors.name && touched.name ? "input-error" : ""}
          />
          {errors.name && touched.name && (
            <div className="description-error">{errors.name}</div>
          )}
        </div>
        <div>
          <label htmlFor="mobile">شماره تماس:</label>
          <InputText
            id="mobile"
            name="mobile"
            maxLength={11}
            value={values.mobile}
            onChange={handleMobileChange}
            onBlur={handleBlur}
            placeholder="لطفاً شماره تماس را وارد نمایید"
            className={`input-mobile ${
              errors.mobile && touched.mobile ? "input-error" : ""
            }`}
          />
          {errors.mobile && touched.mobile && (
            <div className="description-error">{errors.mobile}</div>
          )}
        </div>
        <div className="addressWrapper">
          <label htmlFor="address">نشانی:</label>
          <InputTextarea
            id="address"
            name="address"
            maxLength={150}
            value={values.address}
            onChange={handleInputChange}
            onBlur={handleBlur}
            rows={5}
            cols={30}
            placeholder="لطفاً نشانی را وارد نمایید"
            className={errors.address && touched.address ? "input-error" : ""}
          />
          <span>{values.address?.length}/150</span>
          {errors.address && touched.address && (
            <div className="description-error">{errors.address}</div>
          )}
        </div>
        <Button
          className={`submitButton ${
            isSubmitDisabled ? "Submit-disable" : "Submit-enable"
          }`}
          type="submit"
          label="ثبت"
          disabled={isSubmitDisabled}
        />
        <Button
          className="cancelButton"
          label="انصراف"
          onClick={() => setNavSideMenu(NAV_SIDE.MENU.CUSTOMER_LIST)}
          type="button"
        />
      </form>
    </CreateAdCustomersStyles>
  );
};

export default CreateAdCustomers;
