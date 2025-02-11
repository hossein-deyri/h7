import { AdFormPaymentStyles } from "./AdFormPaymentStyles";
import { InputNumber } from "primereact/inputnumber";
import useAdFormPayment from "./useAdFormPayment";

const AdFormPayment = ({ values, setValues, errors, touched }) => {
  const { onChangePrice, adId } = useAdFormPayment({ setValues, values });

  return (
    <>
      <AdFormPaymentStyles>
        <h2>جزئیات پرداخت:</h2>
        <label htmlFor="currency">مبلغ را وارد نمایید:</label>
        <InputNumber
          inputId="currency"
          value={values.price / 10}
          onChange={(e) => onChangePrice(e.value)}
          disabled={adId}
        />
        <span className="currency-unit">تومان</span>
      </AdFormPaymentStyles>
      {errors.price && touched.price && (
        <div className="error-message">{errors.price}</div>
      )}
    </>
  );
};

export default AdFormPayment;
