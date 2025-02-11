import { InputNumber } from "primereact/inputnumber";
import { AdFormLimitsStyles } from "./AdFormLimitsStyles";
import CustomDatePicker from "components/common/CustomDatePicker/CustomDatePicker";
import useFormLimits from "./useAdFormLimits";

const AdFormLimits = ({ values, setValues }) => {
  const { handleDateChange } = useFormLimits({ setValues });

  return (
    <AdFormLimitsStyles>
      <h2>محدودیت بازدید آگهی:</h2>
      <div className="form-flex">
        <div className="form-col">
          <label>
            <span>
              <img src="/icon/advertisements/chart.svg" alt="chart" />
            </span>
            تعداد نمایش بازدید:
          </label>
          <InputNumber
            value={values.expirationWatchCount}
            onValueChange={(e) =>
              setValues({
                ...values,
                expirationWatchCount: e.value,
              })
            }
            placeholder="تعداد نمایش بازدید"
            className="ltr-input"
          />
        </div>
        <div className="form-col ad-duration">
          <label>
            <span>
              <img src="/icon/advertisements/timer.svg" alt="timer" />
            </span>
            مدت زمان نمایش:
          </label>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">ثانیه</span>
            <InputNumber
              value={values.expirationWatchDuration}
              onValueChange={(e) =>
                setValues({
                  ...values,
                  expirationWatchDuration: e.value,
                })
              }
              placeholder="مدت زمان نمایش"
              className="ltr-input"
            />
          </div>
        </div>
        <div className="form-col">
          <label>
            <span>
              <img src="/icon/advertisements/calender.svg" alt="calender" />
            </span>
            زمان اتمام آگهی:
          </label>
          <CustomDatePicker
            value={values?.expirationDate}
            onDateChange={handleDateChange}
            minDate={values.startDate}
            maxDate=""
            disabled={!values.startDate}
          />
        </div>
      </div>
    </AdFormLimitsStyles>
  );
};

export default AdFormLimits;
