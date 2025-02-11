import * as Yup from "yup";
import { useEffect } from "react";
import { useFormik } from "formik";
import {
  createAdvertisement,
  getAdvertisementById,
  updateAdvertisement,
} from "services/advertisementServices/advertisementServices";
import { showError, showSuccess } from "utilize/toast";
import { validation } from "utilize/validation/validation";
import { useSelector, useDispatch } from "react-redux";
import { clearAdId } from "redux/slices/adsSlice";
import { NAV_SIDE } from "utilize/constant/constants";

const useCreateAd = ({ setNavSideMenuHandler }) => {
  const adId = useSelector((state) => state.ads.adId);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const payload = { ...values };

    if (adId) {
      updateAdvertisement(adId, payload)
        .then((response) => {
          const userMessage = response?.data?.data?.userMessage;
          showSuccess(userMessage);
          setNavSideMenuHandler(NAV_SIDE.MENU.ADS_LIST);
          dispatch(clearAdId());
        })
        .catch((error) => {
          const userMessage = error?.data?.userMessage;
          showError(userMessage);
        });
    } else {
      createAdvertisement(payload)
        .then((response) => {
          const userMessage = response?.data?.data?.userMessage;
          showSuccess(userMessage);
          setNavSideMenuHandler(NAV_SIDE.MENU.ADS_LIST);
        })
        .catch((error) => {
          const userMessage = error?.data?.userMessage;
          showError(userMessage);
        });
    }
  };

  const validationSchema = Yup.object().shape({
    customerId: Yup.number()
      .nullable()
      .required("عنوان شخص یا شرکت الزامی است"),
    title: validation.required({ value: "عنوان" }),
    link: validation.link(),
    fileUrl: Yup.mixed().required("آپلود ویدئو الزامی است"),
    skippable: Yup.boolean(),
    minSkipTime: Yup.number()
      .nullable()
      .when("skippable", {
        is: true,
        then: validation
          .numberRequired({ value: "زمان رد شدن آگهی" })
          .min(3, "زمان رد شدن آگهی باید حداقل ۳ ثانیه باشد"),
        otherwise: Yup.number().nullable(),
      }),
    startDate: validation.required({
      value: "تاریخ شروع",
    }),
    ages: Yup.array()
      .min(1, "انتخاب حداقل یک محدوده سنی الزامی است")
      .required("انتخاب محدوده سنی الزامی است"),
    priority: Yup.number().nullable().required("وزن تبلیغات الزامی است"),
    price: Yup.number().nullable().required("مبلغ الزامی است"),
  });

  const formik = useFormik({
    initialValues: {
      customerId: null,
      fileUrl: "",
      title: "",
      link: "",
      description: "",
      skippable: false,
      minSkipTime: null,
      startDate: "",
      ages: [],
      permittedTagIds: [],
      forbiddenTagIds: [],
      priority: null,
      expirationWatchCount: null,
      expirationWatchDuration: null,
      expirationDate: "",
      price: null,
    },
    validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  useEffect(() => {
    if (adId) {
      getAdvertisementById(adId)
        .then((response) => {
          const data = response.data.data;
          formik.setValues({
            customerId: data.customer.id,
            fileUrl: data.fileUrl,
            title: data.title,
            link: data.link,
            description: data.description || "",
            skippable: data.skippable || false,
            minSkipTime: data.minSkipTime || null,
            startDate: data.startDate || "",
            ages: data.ages?.map((item) => item) || [],
            permittedTagIds: data.permittedTags?.map((item) => item.id) || [],
            forbiddenTagIds: data.forbiddenTags?.map((item) => item.id) || [],
            priority: data.priority || null,
            expirationWatchCount: data.expirationWatchCount || null,
            expirationWatchDuration: data.expirationWatchDuration || null,
            expirationDate: data.expirationDate || "",
            price: data.price || null,
          });
        })
        .catch((error) => {
          showError("Failed");
        });
    }
  }, [adId]);

  return { formik };
};

export default useCreateAd;
