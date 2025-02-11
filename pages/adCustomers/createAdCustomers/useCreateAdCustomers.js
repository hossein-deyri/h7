import { useFormik } from "formik";
import * as Yup from "yup";
import { showError, showSuccess } from "utilize/toast";
import {
  postAdvertisementCustomers,
  getAdvertisementCustomersById,
  putAdvertisementCustomers,
} from "services/advertisementCustomers/advertisementCustomers";
import { useEffect } from "react";
import { NAV_SIDE } from "utilize/constant/constants";

const useCreateAdCustomers = ({ productID, setNavSideMenu }) => {
  const onSubmit = (values) => {
    const { name, mobile, address } = values;
    const params = {
      name: name.trim(),
      ...(mobile && { mobile }),
      ...(address && { address: address.trim() }),
    };

    const api = !!productID
      ? putAdvertisementCustomers(productID, params)
      : postAdvertisementCustomers(params);

    api
      .then((response) => {
        showSuccess(response.data.userMessage);
        setNavSideMenu(NAV_SIDE.MENU.CUSTOMER_LIST);
      })
      .catch((error) => {
        const { name, mobile, address } = error?.data?.extraParams || {};
        setErrors({ name, mobile, address });
        showError(error?.data.userMessage);
      });
  };

  const handleMobileChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    setFieldValue("mobile", newValue);
  };

  const {
    handleSubmit,
    handleBlur,
    handleChange: handleInputChange,
    setFieldValue,
    setValues,
    values,
    errors,
    touched,
    setErrors,
  } = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      address: "",
    },
    onSubmit,
    // TODO: @hosein: We should use the general validationSchema
    validationSchema: Yup.object().shape({
      name: Yup.string().required("عنوان آگهی‌دهنده نمیتواند خالی باشد"),
      mobile: Yup.string()
        .matches(/^0[1-9][0-9]+$/, "فرمت شماره تماس وارد شده صحیح نمی باشد")
        .min(11, "تعداد ارقام شماره تماس باید 11 رقم باشد"),
      address: Yup.string(),
    }),
  });

  const isSubmitDisabled = !values.name.trim();

  useEffect(() => {
    if (productID) {
      getAdvertisementCustomersById(productID)
        .then((response) => {
          const { name, address, mobile } = response?.data?.data;
          setValues({ name, address, mobile });
        })
        .catch((error) => {
          showError(error?.data.userMessage);
        });
    }
  }, [productID]);

  return {
    values,
    errors,
    touched,
    isSubmitDisabled,
    handleSubmit,
    handleInputChange,
    handleBlur,
    handleMobileChange,
  };
};

export default useCreateAdCustomers;
