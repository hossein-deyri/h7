import { useState } from "react";
import { getAdvertisementCustomers } from "services/advertisementCustomers/advertisementCustomers";
import { NAV_SIDE } from "utilize/constant/constants";
import TABLE_CELL_TYPE from "utilize/constant/tableColumnType";
import { Button } from "primereact/button";
import { deleteAdvertisementCustomers } from "services/advertisementCustomers/advertisementCustomers";
import { showError, showSuccess } from "utilize/toast";

const useAdCustomersList = ({ setNavSideMenu, setProductID }) => {
  const [customersList, setCustomersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState();
  const [showDialog, setShowDialog] = useState(false);
  const [customerId, setCustomerId] = useState();
  const [customerName, setCustomerName] = useState("");

  const columns = [
    { id: "name", title: "عنوان شخص" },
    { id: "address", title: "نشانی" },
    { id: "mobile", title: "اطلاعات تماس", width: "180px" },
    {
      width: "160px",
      renderType: TABLE_CELL_TYPE.CUSTOM,
      render: (rowData) => {
        const buttons = [
          {
            icon: "/icon/table/Pencil.svg",
            onClick: () => onNavigateEditAdCustomer(rowData),
            className: "p-button-rounded p-button-outlined mx-1",
          },
          {
            icon: "/icon/table/Cross.svg",
            onClick: () => handleShowDialog(rowData.id, rowData.name),
            className:
              "p-button-rounded p-button-danger p-button-outlined me-1",
          },
        ];

        return (
          <div className="action-wrapper">
            {buttons.map((button, index) => (
              <Button
                key={index}
                className={button.className}
                onClick={button.onClick}
              >
                <img src={button.icon} alt={button.alt} />
              </Button>
            ))}
          </div>
        );
      },
    },
  ];

  const fetchCustomersList = (pageSize, currentPage) => {
    const params = {
      page: currentPage,
      size: pageSize,
    };
    setIsLoading(true);
    getAdvertisementCustomers(params)
      .then((response) => {
        setCustomersList(response.data.data.items);
        setTotalItems(response.data.data.total);
      })
      .catch((error) => {
        showError(error?.data?.userMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteAdCustomers = () => {
    deleteAdvertisementCustomers(customerId)
      .then((response) => {
        showSuccess(response.data.userMessage);
        fetchCustomersList();
      })
      .catch((error) => {
        showError(error?.data.userMessage);
      })
      .finally(handleHideDialog);
  };

  const handleShowDialog = (id, name) => {
    setShowDialog(true);
    setCustomerId(id);
    setCustomerName(name);
  };

  const handleSubmitDialogAction = () => {
    handleDeleteAdCustomers();
  };

  const handleHideDialog = () => {
    setShowDialog(false);
  };

  const onNavigateEditAdCustomer = (rowData) => {
    setNavSideMenu(NAV_SIDE.MENU.CREATE_AD_CUSTOMER);
    setProductID(rowData.id);
  };

  const onNavigateCreateAdCustomer = () => {
    setNavSideMenu(NAV_SIDE.MENU.CREATE_AD_CUSTOMER);
    setProductID(null);
  };

  return {
    onNavigateCreateAdCustomer,
    handleSubmitDialogAction,
    fetchCustomersList,
    handleDeleteAdCustomers,
    handleHideDialog,
    customersList,
    totalItems,
    isLoading,
    columns,
    showDialog,
    customerId,
    customerName,
  };
};

export default useAdCustomersList;
