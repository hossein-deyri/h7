import { useState, useEffect, useRef } from "react";
import { getAdvertisementCustomers } from "services/advertisementCustomers/advertisementCustomers";
import { showError } from "utilize/toast";
import { useDebouncedCallback } from "use-debounce";

const useAdFormAdvertiser = ({ values, setValues }) => {
  const [selectedAdCustomer, setSelectedAdCustomer] = useState(null);
  const [valueList, setValueList] = useState([]);
  const dropdownRef = useRef();

  const onChangeSelectedValues = (value) => {
    setValues({
      ...values,
      customerId: value.id,
    });
    setSelectedAdCustomer(value);
  };

  const searchByValue = (event) => {
    fetchValueList(event.filter?.trim());
  };

  const fetchValueList = useDebouncedCallback((filterValue) => {
    const params = {
      ...(filterValue && { search: filterValue }),
      ...(!filterValue && { size: 20 }),
    };

    getAdvertisementCustomers(params)
      .then((response) => {
        if (response.data.data.items.length > 0) {
          setValueList(response.data.data.items);
        }
      })
      .catch(() => {
        showError();
      });
  }, 700);

  useEffect(() => {
    fetchValueList();
  }, []);

  useEffect(() => {
    const customer = valueList.find((item) => item.id === values.customerId);
    if (customer) {
      setSelectedAdCustomer(customer);
    }
  }, [valueList, values.customerId]);

  return {
    onChangeSelectedValues,
    searchByValue,
    selectedAdCustomer,
    dropdownRef,
    valueList,
  };
};

export default useAdFormAdvertiser;
