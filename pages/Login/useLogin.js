import { ssoEndpoints } from "endpoints";
import QueryString from "qs";
import { useEffect, useRef, useState } from "react";
import http, { post } from "services/httpService";
import { showError } from "utilize/toast";
import { validation } from "utilize/validation/validation";
import * as Yup from "yup";

const useLogin = ({ setLoginState }) => {
  const formikRef = useRef(null);
  const [loadingState, setLoadingState] = useState(false);
  const [refNumber, setrefNumber] = useState(null);
  const [isOtpStep, setIsOtpStep] = useState(false);

  const formInitialValues = {
    mobile: "",
    otp: "",
  };

  const validationSchema = Yup.object({
    mobile: validation.mobile(),
    otp: isOtpStep ? validation.otp() : null,
  });

  useEffect(() => {
    localStorage.clear();
  }, []);

  const onFieldKeyPress = (event) => {
    if (event.key === "Enter") return;

    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  const onSubmit = async (values) => {
    setLoadingState(true);
    delete http.defaults.headers.common["Authorization"];

    const requestBody = {
      client_id: "nobino-direct",
      grant_type: "password",
      client_secret: process.env.REACT_APP_SSO_SECRET,
      mobile: values.mobile,
      ...(isOtpStep && { ref_number: refNumber, otp: values.otp }),
    };

    const requestConfig = {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };

    try {
      const { data } = await post(
        process.env.REACT_APP_SSO_URL + ssoEndpoints.TOKEN,
        QueryString.stringify(requestBody),
        requestConfig
      );

      if (!isOtpStep) {
        setrefNumber(data.refNumber);
        formikRef.current?.setTouched({ otp: false });
        setIsOtpStep(true);
        return;
      }

      localStorage.setItem("API_TOKEN", data.access_token);
      http.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.access_token}`;
      setLoginState(true);
    } catch (error) {
      // TODO: @ali: handle catch state on wrong otp
      showError(error);
    } finally {
      setLoadingState(false);
    }
  };

  return {
    formInitialValues,
    formikRef,
    validationSchema,
    isOtpStep,
    loadingState,
    onFieldKeyPress,
    onSubmit,
  };
};

export default useLogin;
