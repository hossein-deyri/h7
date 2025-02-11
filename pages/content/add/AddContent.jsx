/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import { Content } from "./addContentStyle";
import { TabMenu } from "primereact/tabmenu";
import { Chip } from "primereact/chip";
import { addTextContentSchema } from "utilize/validation/validation";
import { showSuccess, showError } from "utilize/toast";
import {
  CONST_POSTED,
  CONST_SEASON,
  CONST_SERIES,
  CONTENT,
  IMAGES_ITEM_FIELD_TYPE_ENUMS,
} from "utilize/constant/constants";
import { productEmptyInitialValue } from "utilize/data/data";
import TextContent from "components/content/add/tab/textContent/TextContent";
import Screenshots from "components/content/add/tab/Screenshots";
import RelationTab from "components/content/add/tab/RelationTab";
import VisualContent from "components/content/add/tab/VisualContent";
import SubtitleAndSound from "components/content/add/tab/SubtitleAndSound";
import { Film } from "@styled-icons/remix-line/Film";
import { get, post, put } from "services/httpService";
import { endpoints } from "endpoints";
import { EXCLUSIVE_SECTION } from "utilize/constant/exclusive";
import PRODUCT_STATE from "utilize/constant/productState";
import ProductStateButton from "components/content/add/productStateButton/ProductStateButton";

const AddContent = ({ productID: editedProductID }) => {
  const formikRef = useRef(null);
  const [items, setItems] = useState([]);
  const [SSRTags, setSSRTags] = useState([]);
  const [category, setCategory] = useState("");
  const [SSRPerson, setSSRPerson] = useState([]);
  const [SSROwners, setSSROwners] = useState([]);
  const [productType, setProductType] = useState();
  const [productName, setProductName] = useState("");
  const [productState, setProductState] = useState(null);
  const [SSRCountries, setSSRCountries] = useState([]);
  const [IV, setIV] = useState(productEmptyInitialValue);
  const [productID, setProductID] = useState(editedProductID);
  const IS_EDIT_PAGE = !!productID;
  const [addContentState, setAddContentState] = useState(CONTENT.ADD.TAB.TEXT);

  useEffect(() => {
    if (category !== "SERIES" && category !== "SEASON") {
      setItems([
        {
          label: "ورود محتوای متنی",
          icon: "pi pi-fw pi-file",
          command: () => setAddContentState(CONTENT.ADD.TAB.TEXT),
        },
        {
          label: "ورود محتوای بصری",
          icon: "pi pi-fw pi-images",
          command: () => setAddContentState(CONTENT.ADD.TAB.VISUAL),
        },
        {
          label: "افزودن زیرنویس و صوت",
          icon: "pi pi-fw pi-pencil",
          command: () => setAddContentState(CONTENT.ADD.TAB.SUB_AND_SOUND),
        },
        {
          label: "اسکرین شات‌ها",
          icon: "pi pi-fw pi-file",
          command: () => setAddContentState(CONTENT.ADD.TAB.SCREENSHOT),
        },
      ]);
    } else {
      setItems([
        {
          label: "ورود محتوای متنی",
          icon: "pi pi-fw pi-file",
          command: () => setAddContentState(CONTENT.ADD.TAB.TEXT),
        },
        {
          label: "ورود محتوای بصری",
          icon: "pi pi-fw pi-images",
          command: () => setAddContentState(CONTENT.ADD.TAB.VISUAL),
        },
        {
          label: "برقراری ارتباط",
          icon: "pi pi-fw pi-link",
          command: () => setAddContentState(CONTENT.ADD.TAB.RELATION_TAB),
        },
      ]);
    }
  }, [category]);

  useEffect(() => {
    Promise.all([
      get(endpoints.OWNERS).then(({ data }) => setSSROwners(data.data)),
      get(endpoints.TAGS()).then(({ data }) => setSSRTags(data.data)),
      get(endpoints.PERSONS).then(({ data }) => setSSRPerson(data.data)),
      get(endpoints.COUNTRIES).then(({ data }) => setSSRCountries(data.data)),
    ]).catch((error) => showError(error));
  }, []);

  useEffect(() => {
    if (IS_EDIT_PAGE) {
      get(endpoints.PRODUCTS(productID))
        .then(({ data }) => {
          const product = data.data;
          setProductType(product.category);
          setProductName(product.name);
          setProductState(product.state);
          const images = product.images;
          images?.map((image) => {
            if (
              image.imageType === IMAGES_ITEM_FIELD_TYPE_ENUMS.SCREEN_SHOT.label
            ) {
              if (!product[image.imageType]) {
                product[image.imageType] = [];
              }
              product[image.imageType].push({
                id: image.id,
                src: image.src,
                state: CONST_POSTED,
              });
            } else
              product[image.imageType] = {
                id: image.id,
                src: image.src,
              };

            return null;
          });
          setIV({
            ...product,
            tags: product?.tags
              ?.filter((tag) => tag.fixed === false)
              .map((tag) => ({
                value: tag?.id,
                label: tag?.name,
              })),
            fixedTags: product?.tags?.filter((tag) => tag.fixed === true),
            countries: product?.countries?.map((country) => ({
              value: country?.id,
              label: country?.name,
            })),
            shortDescription: product?.shortDescription,
            longDescription: product?.longDescription,
            actors: product?.actors?.map((actor) => ({
              value: actor?.id,
              label: actor?.name,
            })),
            directors: product?.directors?.map((d) => ({
              value: d?.id,
              label: d?.name,
            })),
            subtitles: product.subtitles ? product.subtitles : [],
            sounds: product.sounds ? product.sounds : [],
            ownerId: product.owner?.id,
            videos: product.videos ? product.videos : [],
            subscriptionType: product?.subscriptionType,
            price: product?.plan?.price,
            finalPrice: product?.plan?.finalPrice,
            subscriptionLifeTime: +product?.plan?.lifeTime / 60,
            accessTime:
              +product?.plan?.lifeTime / 60 > 0
                ? EXCLUSIVE_SECTION.OPTIONS.LIMITED
                : EXCLUSIVE_SECTION.OPTIONS.UNLIMITED,
            orderDate: product?.orderDate,
          });
        })
        .catch((err) => Promise.reject(err));
    } else {
      setIV(productEmptyInitialValue);
    }
  }, [IS_EDIT_PAGE]);

  const submitHandler = (values, isValid) => {
    if (isValid) {
      let tags = [
        ...(values && values.tags ? values.tags.map((item) => item.value) : []),
        ...(values && values.fixedTags
          ? values.fixedTags.map((item) => (item.value ? item.value : item.id))
          : []),
      ];

      if (values.shortDescription.length > 1500)
        return showError(
          "تعداد کاراکترهای توضیحات کوتاه از حد مجاز عبور کرده است."
        );

      if (values.longDescription.length > 2000)
        return showError(
          "تعداد کاراکترهای توضیحات بلند از حد مجاز عبور کرده است."
        );

      let productBody = {
        actors: values.actors.map((item) => item.value),
        category: values.category,
        screeningState: values.screeningState,
        countries: values?.countries?.map((item) => item.value),
        directors: values?.directors?.map((item) => item.value),
        name: values.name,
        ownerId: values.ownerId,
        productionYear: values.productionYear,
        tags,
        translatedName: values.translatedName,
        ages: values.ages,
        imdbCode: values.imdbCode,
        shortDescription: values.shortDescription,
        longDescription: values.longDescription,
        subscriptionType: values.subscriptionType,
        price: +values.price,
        finalPrice: +values.finalPrice,
        subscriptionLifeTime: +values.subscriptionLifeTime * 60,
        orderDate: values.orderDate,
      };

      if (productID) {
        return put(endpoints.PRODUCTS(productID), JSON.stringify(productBody))
          .then((response) => {
            setProductState(response.data.data?.state);
            setProductType(response.data.data?.category);
            showSuccess("عملیات ویرایش با موفقیت انجام شد");
          })
          .catch((err) => {
            showError(
              err?.response?.data?.data?.errorCode === "05002"
                ? "کد imdb تکراری میباشد"
                : err
            );
          });
      }

      return postProducts(productBody);
    } else {
      showError();
    }
  };

  const postProducts = async (productBody) => {
    try {
      const response = await post(endpoints.PRODUCTS(), productBody);
      showSuccess();
      setProductID(response.data.data.id);
      setProductState(response.data.data.state);
    } catch (err) {
      showError(
        err?.response.data.data.errorCode === "05002"
          ? "کد imdb تکراری میباشد"
          : "عملیات مورد نظر با مشکل مواجه شد"
      );
      return Promise.reject(err);
    }
  };

  const ActionButtons = () =>
    Object.values(PRODUCT_STATE).map(
      (state) =>
        productState !== state.id && (
          <ProductStateButton
            productId={productID}
            {...{ state }}
            onStateUpdate={(newState) => setProductState(newState)}
          />
        )
    );

  return (
    <Content className="container bg-white border shadow p-3">
      <div className="d-flex justify-content-between">
        <h4 className="mainTitle">
          <span className="filmIconHolder">
            <Film />
          </span>
          {IS_EDIT_PAGE ? productName : "افزودن محتوا جدید"}
          {IS_EDIT_PAGE && PRODUCT_STATE[productState] && (
            <Chip
              label={PRODUCT_STATE[productState].label}
              className={PRODUCT_STATE[productState].variant}
            />
          )}
        </h4>
        <div className="d-flex align-items-center">
          {IS_EDIT_PAGE && <ActionButtons />}
        </div>
      </div>
      <TabMenu model={items} className={!productID && "tabNotActive"} />
      <Formik
        ref={formikRef}
        enableReinitialize={true}
        initialValues={IV}
        validationSchema={addTextContentSchema}
      >
        {({ values, errors, touched, isValid, setFieldValue, setValues }) => (
          <Form className="needs-validation fs-14 py-4">
            <div className="d-flex">
              <div className="card w-100">
                {addContentState === CONTENT.ADD.TAB.TEXT && (
                  <TextContent
                    values={values}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    setValues={setValues}
                    SSRTags={SSRTags}
                    SSRPerson={SSRPerson}
                    SSRCountries={SSRCountries}
                    SSROwners={SSROwners}
                    onClick={() => submitHandler(values, isValid)}
                    productType={values.category}
                    setCategory={setCategory}
                    // TODO: @ali: check here
                    setIV={setIV}
                  />
                )}
                {addContentState === CONTENT.ADD.TAB.VISUAL && (
                  <VisualContent
                    values={values}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    productID={productID}
                  />
                )}
                {addContentState === CONTENT.ADD.TAB.SUB_AND_SOUND &&
                  values.category !== CONST_SERIES &&
                  values.category !== CONST_SEASON && (
                    <SubtitleAndSound
                      values={values}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                      productID={productID}
                    />
                  )}
                {addContentState === CONTENT.ADD.TAB.SCREENSHOT &&
                  values.category !== CONST_SERIES &&
                  values.category !== CONST_SEASON && (
                    <Screenshots
                      screenshots={values.SCREEN_SHOT || []}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                      productID={productID}
                      values={values}
                    />
                  )}
                {addContentState === CONTENT.ADD.TAB.VISUAL &&
                  values.category === !CONST_SERIES &&
                  values.category === !CONST_SEASON && (
                    <VisualContent
                      values={values}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                      productID={productID}
                    />
                  )}
                {addContentState === CONTENT.ADD.TAB.SUB_AND_SOUND &&
                  values.category === !CONST_SERIES &&
                  values.category === !CONST_SEASON && (
                    <SubtitleAndSound
                      values={values}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                      productID={productID}
                    />
                  )}
                {addContentState === CONTENT.ADD.TAB.SCREENSHOT &&
                  values.category === !CONST_SERIES &&
                  values.category === !CONST_SEASON && (
                    <Screenshots
                      screenshots={values.SCREEN_SHOT || []}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                      productID={productID}
                      values={values}
                    />
                  )}
                {addContentState === CONTENT.ADD.TAB.RELATION_TAB && (
                  <RelationTab
                    productType={productType}
                    productId={productID}
                  />
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Content>
  );
};

export default AddContent;
