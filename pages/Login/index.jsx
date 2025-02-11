import { LoginStyle } from "./LoginStyle";
import { Formik, Form, Field, ErrorMessage } from "formik";
import nobinoLogo from "statics/img/nobinoLogo.svg";
import nobinoWithDescriptionLogo from "../../statics/img/Nobino1.png";
import useLogin from "./useLogin";
import { Button } from "primereact/button";

const Login = ({ setLoginState }) => {
  const {
    formInitialValues,
    formikRef,
    validationSchema,
    isOtpStep,
    loadingState,
    onFieldKeyPress,
    onSubmit,
  } = useLogin({
    setLoginState,
  });

  const FormField = ({
    fieldName,
    label,
    placeholder,
    maxLength,
    hasError,
    ...rest
  }) => (
    <div className="inputBox">
      <label htmlFor={fieldName}>{label}</label>
      <Field
        className={"form-control" + (hasError ? " error-input" : "")}
        name={fieldName}
        type="text"
        autoFocus
        onKeyPress={onFieldKeyPress}
        {...{ placeholder, maxLength }}
        {...rest}
      />
      <ErrorMessage name={fieldName} component="div" className="error" />
    </div>
  );

  const SubmitButton = () => (
    <Button
      label={isOtpStep ? "ورود" : "دریافت کد"}
      type="submit"
      icon={`pi ${isOtpStep ? "pi-sign-in" : "pi-key"}`}
      loading={loadingState}
      className="submit-button"
      severity="danger"
    />
  );

  return (
    <LoginStyle className="loginPage d-flex flex-column">
      <div className="infoBoxLogin">
        <img
          src={nobinoWithDescriptionLogo}
          alt="nobino-logo"
          height="50px"
          className="mb-3"
        />
        <p className="text-white">ورود به پنل محتوای نوبینو</p>
      </div>

      <Formik
        innerRef={formikRef}
        initialValues={formInitialValues}
        validateOnBlur={false}
        {...{ validationSchema, onSubmit }}
      >
        {({ errors, touched }) => (
          <Form className="loginBox">
            <img className="logo" src={nobinoLogo} alt="nobino" />
            <div className="form-wrapper">
              {isOtpStep ? (
                <FormField
                  fieldName="otp"
                  label="کد تایید"
                  placeholder="کد ارسال شده به تلفن همراه خود را وارد نمایید"
                  maxLength={5}
                  hasError={!!errors.otp && touched.otp}
                  autoComplete="false"
                />
              ) : (
                <FormField
                  fieldName="mobile"
                  label="شماره موبایل"
                  placeholder="شماره موبایل خود را وارد نمایید"
                  maxLength={11}
                  hasError={!!errors.mobile && touched.mobile}
                />
              )}
            </div>
            <SubmitButton />
          </Form>
        )}
      </Formik>
    </LoginStyle>
  );
};

export default Login;
