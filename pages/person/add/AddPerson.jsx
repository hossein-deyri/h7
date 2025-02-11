import { AddPersonStyle } from "./AddPersonStyle";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Textarea from "components/content/add/form/textarea/index.jsx";
import { useRef, useState } from "react";
import { post } from "services/httpService";
import { endpoints } from "endpoints";
import { showSuccess, showError } from "utilize/toast";
import { CONST_FEMALE, CONST_MALE } from "utilize/constant/constants";

export const Person = () => {
  const [loadingState, setLoadingState] = useState(false);
  const genders = [
    { value: CONST_MALE, option: "مرد" },
    { value: CONST_FEMALE, option: "زن" },
  ];

  return (
    <AddPersonStyle>
      <div className="title">
        <h4>افزودن شخص</h4>
      </div>

      <div className="contentBody">
        <Formik
          initialValues={{
            name: "",
            translatedName: "",
            description: "",
            gender: "",
          }}
          onSubmit={async (values) => {
            const body = JSON.stringify(values);
            setLoadingState(true);
            await post(endpoints.PERSONS, body)
              .then(({ data }) => {
                showSuccess();
              })
              .catch((err) => {
                showError();
              })
              .finally(() => setLoadingState(false));
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form className="d-flex justify-content-center needs-validation fs-14">
              <div className="d-flex flex-column  w-50">
                <div className=" has-validation inputBox d-flex align-items-center">
                  <span>نام فارسی</span>
                  <Field
                    className={`form-control  fs-14 ${
                      touched.name
                        ? errors.name
                          ? "is-invalid"
                          : "is-valid"
                        : ""
                    }`}
                    name="name"
                    value={values.name}
                    placeholder="نام فارسی"
                  />
                  <ErrorMessage
                    className="redText"
                    component="div"
                    name="name"
                  />
                </div>
                <div className=" has-validation inputBox d-flex align-items-center">
                  <span>نام دیگر</span>
                  <Field
                    className={`form-control  fs-14 ${
                      touched.translatedName
                        ? errors.translatedName
                          ? "is-invalid"
                          : "is-valid"
                        : ""
                    }`}
                    name="translatedName"
                    value={values.translatedName}
                    placeholder="نام دیگر"
                  />
                  <ErrorMessage
                    className="redText"
                    component="div"
                    name="name"
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span>جنسیت</span>
                  <Field
                    component="select"
                    className="form-select   fs-14"
                    name="gender"
                    style={{ width: "85%" }}
                  >
                    <option value="" disabled selected hidden>
                      انتخاب جنسیت
                    </option>
                    {genders.map((option) => (
                      <option value={option.value}>{option.option}</option>
                    ))}
                  </Field>
                </div>
                <div className="d-flex flex-column mt-3">
                  <span className="mb-2">بیوگرافی</span>

                  <Textarea
                    className={`form-control  fs-14 ${
                      touched.description
                        ? errors.description
                          ? "is-invalid"
                          : "is-valid"
                        : ""
                    }`}
                    placeholder="بیوگرافی"
                    value={values.description}
                    name="description"
                    setFieldValue={setFieldValue}
                    counter={150}
                    rows={3}
                  />
                </div>

                <button className={`saveBtn ${loadingState && "disabledBtn"}`}>
                  {loadingState && (
                    <div className="spinner-border" role="status">
                      <span className="sr-only"></span>
                    </div>
                  )}
                  افزودن شخص
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </AddPersonStyle>
  );
};

export default Person;
