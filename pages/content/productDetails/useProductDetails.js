import { useEffect, useState } from "react";
import { endpoints } from "endpoints";
import { get } from "services/httpService";
import { timeStampChangeToJalaiDate } from "utilize/date";
import { showError } from "utilize/toast";
import { formatToToman } from "utilize/currency/currency";

const useProductDetails = ({ productID }) => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const hasCertificatedCourse = product?.category === "CERTIFICATED_COURSE";
  const date = timeStampChangeToJalaiDate(
    new Date(product?.createdAt).getTime()
  );

  const items = {
    src: "/assets/images/user.svg",
    fields: [
      { label: "نام ", value: product?.name },
      { label: "تاریخ بارگذاری", value: date },
      ...(product?.category === "SERIES"
        ? [
            {
              label: "تعداد فصل",
              value: relatedProducts?.data?.total
                ? relatedProducts.data.total
                : "-",
            },
          ]
        : []),
      {
        label: "فروش کل",
        value: formatToToman(product?.plan?.finalPrice),
        highlight: true,
      },
      {
        label: "مدرک",
        value: hasCertificatedCourse ? "دارد" : "ندارد",
      },
    ],
  };

  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      try {
        const { data } = await get(endpoints.PRODUCTS(productID));
        setProduct(data.data);
        if (data.data.category !== "MOVIE") {
          const { data: relatedData } = await get(
            endpoints.RELATED_PRODUCTS({ productID })
          );
          setRelatedProducts(relatedData);
        }
      } catch (error) {
        showError();
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductData();
  }, [productID]);

  return { items, isLoading };
};

export default useProductDetails;
