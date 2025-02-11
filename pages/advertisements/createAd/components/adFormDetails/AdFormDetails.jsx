import UploadVideo from "components/content/add/upload/video";
import { VIDEO_ITEM_FIELD_TYPE_ENUMS } from "utilize/constant/constants";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { MultiSelect } from "primereact/multiselect";
import { RadioButton } from "primereact/radiobutton";
import { AdFormDetailsStyles } from "./AdFormDetailsStyles";
import { InputNumber } from "primereact/inputnumber";
import useAdFormDetails from "./useAdFormDetails";
import CustomDatePicker from "components/common/CustomDatePicker/CustomDatePicker";
import { productAgeOptions } from "utilize/data/data";
import { Tooltip } from "primereact/tooltip";

const ADS_PLAY_SEC = 10;

const AdFormDetails = ({
  values,
  setFieldValue,
  setValues,
  errors,
  touched,
}) => {
  const {
    tagIdInputs,
    setTagIdInputs,
    videoDuration,
    setVideoDuration,
    tagsList,
    handleDateChange,
    dropdownRef,
  } = useAdFormDetails({ setValues });

  return (
    <AdFormDetailsStyles ref={dropdownRef}>
      <h2>مشخصات آگهی:</h2>
      <div className="upload-row">
        <div className="upload-file">
          <UploadVideo
            minHeight="200px"
            field={VIDEO_ITEM_FIELD_TYPE_ENUMS.ADVERTISEMENTS.label}
            hasLowerResolution
            isAdFile
            {...{ setVideoDuration, values, setValues, setFieldValue }}
          />
          {errors.fileUrl && touched.fileUrl && (
            <div className="error-message">{errors.fileUrl}</div>
          )}
        </div>
        <div className="upload-inputs">
          <div>
            <label>عنوان آگهی:</label>
            <InputText
              value={values.title}
              onChange={(e) =>
                setValues({
                  ...values,
                  title: e.target.value,
                })
              }
              placeholder="عنوان آگهی را وارد نمایید"
            />
            {errors.title && touched.title && (
              <div className="error-message">{errors.title}</div>
            )}
          </div>
          <div>
            <label>لینک آگهی:</label>
            <InputText
              value={values.link}
              onChange={(e) =>
                setValues({
                  ...values,
                  link: e.target.value,
                })
              }
              className="ltr-input"
              placeholder="https://www.domain.ir/"
            />
            {errors.link && touched.link && (
              <div className="error-message">{errors.link}</div>
            )}
          </div>
        </div>
      </div>
      <div className="textarea-row">
        <label>توضیحات:</label>
        <InputTextarea
          value={values.description}
          onChange={(e) =>
            setValues({
              ...values,
              description: e.target.value,
            })
          }
          placeholder="توضیحات آگهی را وارد نمایید"
          maxLength="150"
        />
      </div>
      <div className="form-flex">
        <div className="form-col">
          {videoDuration > ADS_PLAY_SEC && (
            <Tooltip
              target=".label-tooltip"
              content="با توجه به طولانی بودن مدت زمان ویدئو، گزینه «رد آگهی» به صورت خودکار فعال شده‌است."
              position="top"
            />
          )}
          <label
            className={`label-tooltip ${
              videoDuration > ADS_PLAY_SEC && "text-line"
            }`}
          >
            <Checkbox
              onChange={(e) => {
                const checked = e.target.checked;
                setValues({
                  ...values,
                  skippable: checked,
                });
              }}
              checked={videoDuration > ADS_PLAY_SEC ? true : values.skippable}
              className="extra-radio-checkbox"
              disabled={videoDuration > ADS_PLAY_SEC}
            />
            قابلیت رد آگهی
          </label>
          {videoDuration > ADS_PLAY_SEC && (
            <span className="ad-duration">{` (${Math.floor(
              videoDuration
            )} / ${ADS_PLAY_SEC} ثانیه)`}</span>
          )}
          <InputText
            value={values.minSkipTime}
            onChange={(e) =>
              setValues({
                ...values,
                minSkipTime: e.target.value,
              })
            }
            className="ltr-input"
            disabled={videoDuration <= ADS_PLAY_SEC && !values.skippable}
            type="number"
          />
          {errors.minSkipTime && touched.minSkipTime && (
            <div className="error-message">{errors.minSkipTime}</div>
          )}
        </div>
        <div className="form-col">
          <label>زمان فعال شدن آگهی:</label>
          <CustomDatePicker
            value={values?.startDate}
            onDateChange={handleDateChange}
            minDate={new Date()}
            maxDate=""
          />
          {errors.startDate && touched.startDate && (
            <div className="error-message">{errors.startDate}</div>
          )}
        </div>
        <div className="form-col">
          <label>انتخاب محدوده سنی:</label>
          <MultiSelect
            display="chip"
            value={values.ages}
            options={productAgeOptions}
            onChange={(e) =>
              setValues({
                ...values,
                ages: e.value,
              })
            }
            panelClassName="dropdown-panel"
            {...(dropdownRef?.current && { appendTo: dropdownRef?.current })}
          />
          {errors.ages && touched.ages && (
            <div className="error-message">{errors.ages}</div>
          )}
        </div>
      </div>
      <div className="form-flex">
        <div className="form-col">
          <label>
            <RadioButton
              value="permittedTagIds"
              name="displayAd"
              onChange={(e) => setTagIdInputs(e.value)}
              checked={tagIdInputs === "permittedTagIds"}
              className="extra-radio-checkbox"
            />
            نمایش آگهی در:
          </label>
          <MultiSelect
            disabled={tagIdInputs !== "permittedTagIds"}
            display="chip"
            value={values.permittedTagIds}
            options={tagsList}
            onChange={(e) =>
              setValues({
                ...values,
                permittedTagIds: e.value,
              })
            }
            panelClassName="dropdown-panel"
            {...(dropdownRef?.current && { appendTo: dropdownRef?.current })}
          />
        </div>
        <div className="form-col">
          <label>
            <RadioButton
              value="forbiddenTagIds"
              name="displayAd"
              onChange={(e) => setTagIdInputs(e.value)}
              checked={tagIdInputs === "forbiddenTagIds"}
              className="extra-radio-checkbox"
            />
            عدم نمایش آگهی در:
          </label>
          <MultiSelect
            disabled={tagIdInputs !== "forbiddenTagIds"}
            display="chip"
            value={values.forbiddenTagIds}
            options={tagsList}
            onChange={(e) =>
              setValues({
                ...values,
                forbiddenTagIds: e.value,
              })
            }
            panelClassName="dropdown-panel"
            {...(dropdownRef?.current && { appendTo: dropdownRef?.current })}
          />
        </div>
        <div className="form-col ad-weight">
          <label>وزن تبلیغات:</label>
          <InputNumber
            value={values.priority}
            onValueChange={(e) =>
              setValues({
                ...values,
                priority: e.value,
              })
            }
            showButtons
            buttonLayout="horizontal"
            decrementButtonClassName={values.priority <= 1 && "disable-button"}
            incrementButtonClassName={values.priority >= 10 && "disable-button"}
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"
            min={1}
            max={10}
          />
          {errors.priority && touched.priority && (
            <div className="error-message">{errors.priority}</div>
          )}
        </div>
      </div>
    </AdFormDetailsStyles>
  );
};

export default AdFormDetails;
