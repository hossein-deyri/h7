import { Dropdown } from "primereact/dropdown";
import useAdFormAdvertiser from "./useAdFormAdvertiser";
import { AdFormAdvertiserStyles } from "./AdFormAdvertiserStyles";

const AdFormAdvertiser = ({ values, setValues, errors, touched }) => {
  const {
    onChangeSelectedValues,
    searchByValue,
    selectedAdCustomer,
    dropdownRef,
    valueList,
  } = useAdFormAdvertiser({ values, setValues });

  return (
    <AdFormAdvertiserStyles ref={dropdownRef}>
      <h2>مشخصات آگهی دهنده:</h2>
      <div>
        <label>عنوان شخص / شرکت:</label>
        <Dropdown
          value={selectedAdCustomer}
          onChange={(e) => onChangeSelectedValues(e.value)}
          options={valueList}
          onFilter={searchByValue}
          filter
          placeholder="انتخاب عنوان شخص/شرکت"
          // TODO: @hosein: We need to fix emptyMessage `why doesnt it work`
          // emptyMessage="اطلاعات یافت نشد"
          className="dropDownCustomerName"
          name="customerId"
          optionLabel="name"
          filterBy="name"
          {...(dropdownRef?.current && { appendTo: dropdownRef?.current })}
        />
      </div>
      {errors.customerId && touched.customerId && (
        <div className="error-message">{errors.customerId}</div>
      )}
    </AdFormAdvertiserStyles>
  );
};

export default AdFormAdvertiser;
