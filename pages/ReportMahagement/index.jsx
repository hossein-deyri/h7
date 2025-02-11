import { useEffect } from "react";
import ItemList from "components/content/ItemList";
import getDiscounts from "services/discountServices/getDiscounts";
import { endpoints } from "endpoints";

const ReportManagement = () => {
  useEffect(() => {
    (async () => {
      try {
        const data = await getDiscounts();
        const noDiscount = {
          label: "بدون تخفیف",
          value: null,
        };
        const discounts = data
          .filter(({ status }) => status === "ACTIVE")
          .map(({ code, name }) => ({
            label: name,
            value: code,
          }));
        const mergedObjs = [noDiscount, ...discounts];
      } catch (err) {
        return Promise.reject(err);
      }
    })();
  }, []);

  return (
    <ItemList
      api={endpoints.VIOLATIONS}
      title="لیست گزارش ها"
      itemType="بسته"
      creatingMode={true}
      item={[
        {
          name: "mobile",
          type: "text",
          persianName: "شماره تلفن",
          required: true,
        },
        {
          name: "firstName",
          type: "text",
          persianName: "نام و نام خانوادگی",
          required: true,
        },

        {
          name: "contentName",
          type: "text",
          persianName: "نام محصول",
          required: true,
        },
        {
          name: "reason",
          type: "text",
          persianName: "گزارش",
          required: true,
        },
      ]}
    />
  );
};

export default ReportManagement;
