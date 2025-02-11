import { CreateAdStyles } from "./CreateAdStyles";
import AdFormAdvertiser from "./components/adFormAdvertiser/AdFormAdvertiser";
import AdFormDetails from "./components/adFormDetails/AdFormDetails";
import AdFormLimits from "./components/adFormLimits/AdFormLimits";
import AdFormPayment from "./components/adFormPayment/AdFormPayment";
import { NAV_SIDE } from "utilize/constant/constants";
import { Button } from "primereact/button";
import useCreateAd from "./useCreateAd";

const CreateAd = ({ setNavSideMenuHandler }) => {
  const { formik } = useCreateAd({ setNavSideMenuHandler });

  return (
    <CreateAdStyles>
      <h1>افزودن آگهی جدید</h1>
      <form onSubmit={formik.handleSubmit}>
        <AdFormAdvertiser
          values={formik.values}
          setValues={formik.setValues}
          errors={formik.errors}
          touched={formik.touched}
        />
        <AdFormDetails
          values={formik.values}
          setValues={formik.setValues}
          setFieldValue={formik.setFieldValue}
          errors={formik.errors}
          touched={formik.touched}
        />
        <AdFormLimits values={formik.values} setValues={formik.setValues} />
        <AdFormPayment
          values={formik.values}
          setValues={formik.setValues}
          errors={formik.errors}
          touched={formik.touched}
        />
        <div className="action-buttons">
          <Button type="submit" label="ثبت" className="p-button-success" />
          <Button
            label="انصراف"
            className="p-button-outlined p-button-danger"
            onClick={() => setNavSideMenuHandler(NAV_SIDE.MENU.ADS_LIST)}
          />
        </div>
      </form>
    </CreateAdStyles>
  );
};

export default CreateAd;
