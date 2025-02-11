import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import { endpoints } from "endpoints";
import ItemList from "components/content/ItemList";
import { SubscriptionTypeTabStyles } from "./subscriptionTypeTabStyles";
import {
  CONST_CREDIT_START,
  CONST_DISCOUNT_NAME,
  CONST_CREDIT_END,
  CONST_EXCLUSIVE_NAME,
  CONST_PAYMENT_STATUS,
  CONST_PRICE_SUBSCRIPTION,
  CONST_PURCHASE_DATE,
  CONST_SUBSCRIPTION_TYPE,
} from "utilize/constant/constants";
import * as qs from "qs";
import { SUBSCRIPTION_TYPE } from "utilize/constant/subscriptionType";

const SubscriptionTypeTab = ({ productID }) => {
  const [key, setKey] = useState("system");

  const getApiUrl = (subscriptionType) =>
    endpoints.V2.USERS.SUBSCRIPTIONS(productID) +
    qs.stringify({ subscriptionType }, { addQueryPrefix: true });

  return (
    <SubscriptionTypeTabStyles
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
      variant="pills"
    >
      <Tab eventKey="system" title="اشتراک">
        <div className="col-12">
          <ItemList
            api={getApiUrl(SUBSCRIPTION_TYPE.SYSTEM.id)}
            productID={productID}
            itemType="کاربران"
            item={[
              {
                name: CONST_SUBSCRIPTION_TYPE,
                persianName: "نام اشتراک",
              },
              {
                name: CONST_PURCHASE_DATE,
                persianName: "تاریخ خرید",
              },
              {
                name: CONST_CREDIT_START,
                persianName: "شروع اعتبار",
              },
              {
                name: CONST_CREDIT_END,
                persianName: "پایان اعتبار",
              },
              {
                name: CONST_DISCOUNT_NAME,
                persianName: "نام تخفیف",
              },
              {
                name: CONST_PRICE_SUBSCRIPTION,
                persianName: "مبلغ (تومان)",
              },
              {
                name: CONST_PAYMENT_STATUS,
                persianName: "وضعیت",
              },
            ]}
          />
        </div>
      </Tab>
      <Tab eventKey="custom" title="اختصاصی">
        <ItemList
          api={getApiUrl(SUBSCRIPTION_TYPE.CUSTOM.id)}
          productID={productID}
          itemType="کاربران"
          item={[
            {
              name: CONST_EXCLUSIVE_NAME,
              persianName: "نام",
            },
            {
              name: CONST_PURCHASE_DATE,
              persianName: "تاریخ خرید",
            },
            {
              name: CONST_CREDIT_START,
              persianName: "شروع اعتبار",
            },
            {
              name: CONST_CREDIT_END,
              persianName: "پایان اعتبار",
            },
            {
              name: CONST_DISCOUNT_NAME,
              persianName: "نام تخفیف",
            },
            {
              name: CONST_PRICE_SUBSCRIPTION,
              persianName: "مبلغ (تومان)",
            },
            {
              name: CONST_PAYMENT_STATUS,
              persianName: "وضعیت",
            },
            {
              name: "certificateState",
              persianName: "وضعیت مدرک",
            },
          ]}
        />
      </Tab>
    </SubscriptionTypeTabStyles>
  );
};

export default SubscriptionTypeTab;
