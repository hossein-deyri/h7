import { AdsListStyles } from "./AdsListStyles";
import { Button } from "primereact/button";
import Table from "components/common/table/Table";
import useAdsList from "./useAdsList";
import CustomDialog from "components/common/customDialog/CustomDialog";
import { DIALOG_TYPE } from "utilize/constant/DIALOG_TYPE";

const AdsList = ({ setNavSideMenuHandler }) => {
  const {
    columns,
    adsList,
    handleFetchData,
    isLoading,
    totalItems,
    showDialog,
    hideDialog,
    rowAdTitle,
    handleSubmitDialogAction,
    handleCreateNewAd,
    dialogAction,
  } = useAdsList({ setNavSideMenuHandler });

  return (
    <AdsListStyles>
      <h1>لیست تبلیغات</h1>
      <Button
        label="افزودن تبلیغ جدید"
        className="p-button-success create-ad"
        onClick={handleCreateNewAd}
      />
      <Table
        columns={columns}
        data={adsList}
        paginatable
        totalSize={totalItems}
        isLoading={isLoading}
        fetchData={handleFetchData}
        hasFetchError={false}
        hasRowId
      />
      <CustomDialog
        visible={showDialog}
        onHide={hideDialog}
        onSubmit={handleSubmitDialogAction}
        itemTitle={rowAdTitle}
        dialogType={DIALOG_TYPE[dialogAction]?.id}
      />
    </AdsListStyles>
  );
};

export default AdsList;
