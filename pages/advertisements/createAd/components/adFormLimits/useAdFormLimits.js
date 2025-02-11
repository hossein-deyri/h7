const useAdFormLimits = ({ setValues }) => {
  const handleDateChange = (newExpirationDate) => {
    setValues((values) => ({
      ...values,
      expirationDate: newExpirationDate,
    }));
  };
  return { handleDateChange };
};

export default useAdFormLimits;
