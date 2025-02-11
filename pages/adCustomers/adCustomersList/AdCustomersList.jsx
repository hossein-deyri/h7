import { AdCustomersListStyles } from "./AdCustomersListStyles";
import useAdCustomersList from "./useAdCustomersList";
import Table from "components/common/table/Table";
import { Button } from "primereact/button";
import CustomDialog from "components/common/customDialog/CustomDialog";
import { DIALOG_TYPE } from "utilize/constant/DIALOG_TYPE";

const AdCustomersList = ({ setNavSideMenu, setProductID }) => {
  const {
    onNavigateCreateAdCustomer,
    handleSubmitDialogAction,
    fetchCustomersList,
    handleHideDialog,
    customersList,
    totalItems,
    isLoading,
    columns,
    showDialog,
    customerName,
  } = useAdCustomersList({
    setNavSideMenu,
    setProductID,
  });

  return (
    <AdCustomersListStyles>
      <h2>لیست مشتریان</h2>
      <Button
        label="افزودن مشتری جدید"
        className="p-button-success create-customer"
        onClick={onNavigateCreateAdCustomer}
      />
      <Table
        columns={columns}
        data={customersList}
        paginatable
        pageSize={10}
        totalSize={totalItems}
        isLoading={isLoading}
        fetchData={fetchCustomersList}
        hasFetchError={false}
        hasRowId
      />
      <CustomDialog
        visible={showDialog}
        onHide={handleHideDialog}
        onSubmit={handleSubmitDialogAction}
        itemTitle={customerName}
        dialogType={DIALOG_TYPE.DELETE.id}
      />
    </AdCustomersListStyles>
  );
};

export default AdCustomersList;
