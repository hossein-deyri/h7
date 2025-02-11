import { useEffect, useState } from "react";
import SubscriptionTypeTab from "./components/subscriptionTypeTab/SubscriptionTypeTab";
import DescriptionItem from "../../../components/common/descriptionItem/DescriptionItem";
import { UsersDetailsStyles } from "./usersDetailsStyles";
import { get } from "services/httpService";
import { endpoints } from "endpoints";
import { showError } from "utilize/toast";
import { timeStampChangeToJalaiDate } from "utilize/date";

const UsersDetails = ({ productID }) => {
  const [userCurrentSubscription, setUserCurrentSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userInfo = userCurrentSubscription?.user || {};

  const fullName =
    userInfo.firstName || userInfo.lastName
      ? `${(userInfo.firstName || "") + " " + (userInfo.lastName || "")}`.trim()
      : "-";

  const userSubscriptionState = userCurrentSubscription ? "دارد" : "ندارد";

  const items = {
    src: "/assets/images/user.svg",
    fields: [
      {
        label: "نام و نام خانوادگی",
        value: fullName,
      },
      {
        label: "تاریخ تولد",
        value: timeStampChangeToJalaiDate(userInfo.birthDate) || "-",
      },
      {
        label: "شماره موبایل",
        value: userInfo.mobile || "-",
      },
      {
        label: "وضعیت اشتراک",
        value: userSubscriptionState,
        highlight: !!userCurrentSubscription,
      },
    ],
  };

  useEffect(() => {
    setIsLoading(true);
    if (productID) {
      get(endpoints.V2.USERS.CURRENT_SUBSCRIPTIONS(productID))
        .then((response) => {
          setUserCurrentSubscription(response?.data?.data);
        })
        .catch((error) => {
          showError();
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [productID]);

  return (
    <UsersDetailsStyles>
      <h1>جزئیات فروش</h1>
      <DescriptionItem
        isLoading={isLoading}
        items={items.fields}
        imgSrc={items.src}
      />
      <div className="list-row">
        <h2>لیست خرید کاربر:</h2>
        <SubscriptionTypeTab productID={productID} />
      </div>
    </UsersDetailsStyles>
  );
};

export default UsersDetails;
