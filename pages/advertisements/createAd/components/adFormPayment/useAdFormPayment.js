import { useSelector } from "react-redux";

const useAdFormPayment = ({ values, setValues }) => {
  const adId = useSelector((state) => state.ads.adId);

  const onChangePrice = (value) => {
    if (value === null) {
      setValues({
        ...values,
        price: null,
      });
      return;
    }
    const convertTomanToRial = value * 10;
    setValues({
      ...values,
      price: convertTomanToRial,
    });
  };

  return { onChangePrice, adId };
};

export default useAdFormPayment;
