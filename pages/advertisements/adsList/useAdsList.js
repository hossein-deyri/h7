import { useState } from "react";
import {
  deleteAdvertisement,
  getAdvertisements,
  pauseAdvertisement,
  resumeAdvertisement,
} from "services/advertisementServices/advertisementServices";
import TABLE_CELL_TYPE from "utilize/constant/tableColumnType";
import { showError, showSuccess } from "utilize/toast";
import { Button } from "primereact/button";
import { NAV_SIDE } from "utilize/constant/constants";
import { useDispatch } from "react-redux";
import { clearAdId, setAdId } from "redux/slices/adsSlice";
import BadgeStatus from "components/common/badgeStatus/BadgeStatus";
import { DIALOG_TYPE } from "utilize/constant/DIALOG_TYPE";
import { ADS_STATUS } from "utilize/constant/ADS_STATUS";
import { Tooltip } from "primereact/tooltip";
import numberUtils from "utilize/numberUtils";

const useAdsList = ({ setNavSideMenuHandler }) => {
  const dispatch = useDispatch();
  const [adsList, setAdsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);
  const [rowAdId, setRowAdId] = useState(null);
  const [rowAdTitle, setRowAdTitle] = useState("");
  const [rowAdStatus, setRowStatus] = useState("");

  const handleCreateNewAd = () => {
    dispatch(clearAdId());
    setNavSideMenuHandler(NAV_SIDE.MENU.CREATE_AD);
  };

  const renderTypeIcons = (rowData) => {
    const icons = [];

    if (!!rowData.expirationWatchCount) {
      icons.push(
        <>
          <Tooltip
            target=".chart-tooltip"
            content="تعداد نمایش بازدید"
            position="top"
          />
          <img
            src="/icon/advertisements/chart.svg"
            alt="chart"
            className="chart-tooltip"
          />
        </>
      );
    }

    if (!!rowData.expirationWatchDuration) {
      icons.push(
        <>
          <Tooltip
            target=".timer-tooltip"
            content="مدت زمان نمایش"
            position="top"
          />
          <img
            src="/icon/advertisements/timer.svg"
            alt="timer"
            className="timer-tooltip"
          />
        </>
      );
    }

    if (rowData.expirationDate) {
      icons.push(
        <>
          <Tooltip
            target=".calendar-tooltip"
            content="زمان اتمام آگهی"
            position="top"
          />
          <img
            src="/icon/advertisements/calender.svg"
            alt="calendar"
            className="calendar-tooltip"
          />
        </>
      );
    }

    return icons.length ? icons : "-";
  };

  const columns = [
    { id: "title", title: "عنوان تبلیغ" },
    {
      id: "status",
      title: "وضعیت",
      renderType: TABLE_CELL_TYPE.CUSTOM,
      width: "160px",
      render: (rowData) => (
        <BadgeStatus
          className="badge"
          color={ADS_STATUS[rowData.status]?.variant}
        >
          {ADS_STATUS[rowData.status]?.label || rowData.status}
        </BadgeStatus>
      ),
    },
    {
      title: "تبلیغ بر اساس",
      renderType: TABLE_CELL_TYPE.CUSTOM,
      render: (rowData) => (
        <div className="row-buttons">{renderTypeIcons(rowData)}</div>
      ),
    },
    {
      title: "تعداد بازدید",
      renderType: TABLE_CELL_TYPE.CUSTOM,
      render: (rowData) => {
        return (
          <>
            {rowData.expirationWatchCount && (
              <>{numberUtils.commaSeparated(rowData.expirationWatchCount)} / </>
            )}
            {numberUtils.commaSeparated(rowData.watchCount)}
          </>
        );
      },
    },
    {
      id: "expirationDate",
      title: "تاریخ اتمام",
      renderType: TABLE_CELL_TYPE.DATE,
    },
    {
      title: "مدت زمان نمایش",
      renderType: TABLE_CELL_TYPE.CUSTOM,
      render: (rowData) => {
        return (
          <>
            {rowData.expirationWatchDuration && (
              <>
                {numberUtils.commaSeparated(rowData.expirationWatchDuration)} /{" "}
              </>
            )}
            {numberUtils.commaSeparated(Math.floor(rowData.watchDuration))}{" "}
            ثانیه
          </>
        );
      },
    },
    {
      renderType: TABLE_CELL_TYPE.CUSTOM,
      width: "160px",
      render: (rowData) => {
        const iconSrc = !(rowData.status === ADS_STATUS.PLAYING.id)
          ? "/icon/table/Play.svg"
          : "/icon/table/Pause.svg";

        const buttons = [
          {
            icon: iconSrc,
            onClick: () =>
              handleShowDialog(
                rowData.id,
                rowData.title,
                rowData.status,
                DIALOG_TYPE.PAUSE_OR_RESUME.id
              ),
            disabled: !(
              rowData.status === ADS_STATUS.PAUSED.id ||
              rowData.status === ADS_STATUS.PLAYING.id
            ),
            className: "p-button-rounded p-button-info p-button-outlined",
          },
          {
            icon: "/icon/table/Pencil.svg",
            onClick: () => handleEdit(rowData.id),
            className: "p-button-rounded p-button-info p-button-outlined",
          },
          {
            icon: "/icon/table/Cross.svg",
            onClick: () =>
              handleShowDialog(
                rowData.id,
                rowData.title,
                rowData.status,
                DIALOG_TYPE.DELETE.id
              ),
            className: "p-button-rounded p-button-danger p-button-outlined",
          },
        ];

        return (
          <div className="row-buttons">
            {buttons.map((button, index) => (
              <Button
                key={index}
                className={button.className}
                onClick={button.onClick}
                disabled={button.disabled}
              >
                <img src={button.icon} alt="icon" />
              </Button>
            ))}
          </div>
        );
      },
    },
  ];

  const handleShowDialog = (id, title, status, actionType) => {
    setShowDialog(true);
    setRowAdId(id);
    setRowAdTitle(title);
    setRowStatus(status);
    setDialogAction(actionType);
  };

  const handlePauseAndResume = () => {
    const action =
      rowAdStatus === ADS_STATUS.PLAYING.id
        ? pauseAdvertisement
        : resumeAdvertisement;

    action(rowAdId)
      .then(() => {
        const newStatus =
          rowAdStatus === ADS_STATUS.PLAYING.id
            ? ADS_STATUS.PAUSED.id
            : ADS_STATUS.PLAYING.id;
        setAdsList((prevList) =>
          prevList.map((ad) =>
            ad.id === rowAdId ? { ...ad, status: newStatus } : ad
          )
        );
        showSuccess();
      })
      .catch(() => {
        showError();
      })
      .finally(hideDialog);
  };

  const handleDelete = () => {
    deleteAdvertisement(rowAdId)
      .then(() => {
        showSuccess();
        handleFetchData();
      })
      .catch(() => {
        showError();
      })
      .finally(hideDialog);
  };

  const hideDialog = () => {
    setShowDialog(false);
  };

  const handleSubmitDialogAction = () => {
    if (dialogAction === DIALOG_TYPE.DELETE.id) {
      handleDelete();
    } else if (dialogAction === DIALOG_TYPE.PAUSE_OR_RESUME.id) {
      handlePauseAndResume();
    }
  };

  const handleEdit = (id) => {
    dispatch(setAdId(id));
    setNavSideMenuHandler(NAV_SIDE.MENU.CREATE_AD);
  };

  const handleFetchData = (pageSize, currentPage) => {
    const params = {
      page: currentPage,
      size: pageSize,
    };
    setIsLoading(true);
    getAdvertisements(params)
      .then((response) => {
        const items = response.data.data.items;
        const total = response.data.data.total;
        setAdsList(items);
        setTotalItems(total);
      })
      .catch((error) => {
        const userMessage = error.data.userMessage;
        showError(userMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
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
  };
};

export default useAdsList;
