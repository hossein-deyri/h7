import { useState, useEffect } from "react";
import Axios from "axios";

import { endpoints } from "endpoints";
import { InputSwitch } from "primereact/inputswitch";
import { get, post, put } from "services/httpService";
import { showSuccess, showError } from "utilize/toast";
import UploadImage from "components/content/add/upload/image";
import { deleteChannelProgramsApi } from "utilize/apis/deleteApi";
import { AddChannelStyle, ChannelSection } from "./AddChannelStyle";
import {
  CONST_DELETE,
  IMAGES_ITEM_FIELD_TYPE_ENUMS,
} from "utilize/constant/constants";
import ChannelTiming from "components/Channel/ChannelTiming/ChannelTiming";
import ChannelContent from "components/Channel/ChannelContent/ChannelContent";

const token = localStorage.getItem("API_TOKEN");

if (token && token?.length > 0) {
  Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const channelAPI = Axios.create({
  baseURL: process.env.REACT_APP_API_URL_CHANNEL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const AddChannel = (props) => {
  const [imagePath, setImagePath] = useState("");
  const [channelName, setChannelName] = useState("");
  const [channelLink, setChannelLink] = useState("");
  const [editedTiming, setEditedTiming] = useState([]);
  const [channelStatus, setChannelStatus] = useState();
  const [channelPrograms, setChannelPrograms] = useState([]);
  const [productId, setProductId] = useState(props.productID);
  const [channelStartTime, setChannelStartTime] = useState("");
  const [order, setOrder] = useState(channelPrograms.length + 1);

  const [eventsDeleteitems, setEventsDeleteItem] = useState([]);

  const gettingData = async (id) => {
    await get(endpoints.CHANNELS(id))
      .then(async ({ data }) => {
        const _data = data.data;
        let sec = _data.startTime;
        let hours = Math.floor(sec / 3600);
        let minutes = Math.floor((sec - hours * 3600) / 60);
        if (hours < 10) {
          hours = "0" + hours;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        setChannelLink(_data.link);
        setChannelName(_data.name);
        setImagePath(_data.imagePath);
        setChannelStartTime(hours + ":" + minutes);
        await get(endpoints.CHANNELPROGRAMS(), {
          params: {
            channelId: id,
          },
        })
          .then(({ data }) => {
            data?.data?.programs.sort(function (a, b) {
              return a.order - b.order;
            });
            setChannelPrograms(data.data.programs);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const gettingChannelStatus = async () => {
    productId &&
      (await channelAPI
        .get(endpoints.CHANNELS(productId))
        .then(async ({ data }) => {
          setChannelStatus(data.result.success);
          const requestBody = {
            active: data.result.success,
          };
          await put(
            endpoints.CHANNELS(productId),
            JSON.stringify(requestBody)
          ).catch((err) => console.log(err));
        })
        .catch((err) => console.log(err)));
  };

  const settingChannels = async (channelState) => {
    const time = channelStartTime?.split(":");
    const startTime = Number(time[0]) * 3600 + Number(time[1]) * 60;
    const _edited = [...editedTiming];
    if (eventsDeleteitems.length !== 0) {
      let counter = 0;
      for (let i = 0; i < _edited.length; i++) {
        if (_edited[i].ProgramStatus === CONST_DELETE) {
          await deleteChannelProgramsApi(_edited[i].id).then((res) => {
            counter++;

            const channelsArray = [...channelPrograms];
            const channelsFilterArray = channelsArray.filter(
              (item) => item.ProgramStatus !== "delete"
            );
            if (channelsFilterArray.length === 0) {
              Axios({
                method: "delete",
                url: `${
                  process.env.REACT_APP_API_URL_CHANNEL
                }${endpoints.CHANNELS(productId)}`,
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              })
                .then((res) => {
                  gettingChannelStatus();
                  setEditedTiming([]);
                  setEventsDeleteItem([]);
                })
                .catch((err) => console.log("err", err));
            } else {
              console.log("2 sec", channelPrograms);
              Axios({
                method: "delete",
                url: `${
                  process.env.REACT_APP_API_URL_CHANNEL
                }${endpoints.CHANNELS(productId)}`,
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              })
                .then((res) => {
                  Axios({
                    method: "post",
                    url: `${
                      process.env.REACT_APP_API_URL_CHANNEL
                    }${endpoints.CHANNELS()}`,
                    data: JSON.stringify({
                      active: channelStatus,
                      imagePath,
                      id: productId,
                      name: channelName,
                      startTime: startTime,
                      link: channelLink,
                      programs: channelPrograms.filter(
                        (item) => item.ProgramStatus !== "delete"
                      ),
                    }),
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                  })
                    .then(() => {
                      gettingChannelStatus();
                      setEditedTiming([]);
                      setEventsDeleteItem([]);
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log("err", err));
            }
          });
        } else {
          await put(
            endpoints.CHANNELPROGRAMS(_edited[i].id),
            JSON.stringify(_edited[i])
          ).then(() => counter++);
        }
      }
      gettingData(productId);

      const result = _edited.length - counter;
      result > 0
        ? showError(`${result} مورد با خطا مواجه شد`)
        : showSuccess("عملیات زمان بندی با موفقیت انجام شد");
    } else {
      const time = channelStartTime?.split(":");
      const startTime = Number(time[0]) * 3600 + Number(time[1]) * 60;
      await Axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL_CHANNEL}${endpoints.CHANNELS(
          productId
        )}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (channelPrograms.length !== 0) {
            Axios({
              method: "post",
              url: `${
                process.env.REACT_APP_API_URL_CHANNEL
              }${endpoints.CHANNELS()}`,
              data: JSON.stringify({
                active: channelState,
                imagePath,
                id: productId,
                name: channelName,
                startTime: startTime,
                link: channelLink,
                programs: channelPrograms,
              }),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            })
              .then(() => {
                gettingChannelStatus();
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log("err", err));
    }

    // const time = channelStartTime?.split(":");
    // const startTime = Number(time[0]) * 3600 + Number(time[1]) * 60;
    // await Axios({
    //   method: "delete",
    //   url: `${process.env.REACT_APP_API_URL_CHANNEL}${endpoints.CHANNELS(productId)`,
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // }).then((res) =>{
    //    Axios({
    //     method: "post",
    //     url: `${process.env.REACT_APP_API_URL_CHANNEL}${endpoints.CHANNELS()}`,
    //     data: JSON.stringify({
    //       active: channelState,
    //       imagePath,
    //       id: productId,
    //       name: channelName,
    //       startTime: startTime,
    //       link: channelLink,
    //       programs: channelPrograms,
    //     }),
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then(() => {
    //       gettingChannelStatus();
    //     })
    //     .catch((err) => console.log(err));
    // })
    // .catch((err) => console.log('err' , err))
  };

  const updatingPrograms = async () => {
    const time = channelStartTime?.split(":");
    const startTime = Number(time[0]) * 3600 + Number(time[1]) * 60;
    const _edited = [...editedTiming];
    if (eventsDeleteitems.length !== 0) {
      let counter = 0;
      for (let i = 0; i < _edited.length; i++) {
        if (_edited[i].ProgramStatus === CONST_DELETE) {
          await deleteChannelProgramsApi(_edited[i].id).then(() => {
            counter++;
            Axios({
              method: "delete",
              url: `${
                process.env.REACT_APP_API_URL_CHANNEL
              }${endpoints.CHANNELS(productId)}`,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            })
              .then((res) => {
                Axios({
                  method: "post",
                  url: `${
                    process.env.REACT_APP_API_URL_CHANNEL
                  }${endpoints.CHANNELS()}`,
                  data: JSON.stringify({
                    active: channelStatus,
                    imagePath,
                    id: productId,
                    name: channelName,
                    startTime: startTime,
                    link: channelLink,
                    programs: channelPrograms,
                  }),
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                })
                  .then(() => {
                    gettingChannelStatus();
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log("err", err));
          });
        } else {
          await put(
            endpoints.CHANNELPROGRAMS(_edited[i].id),
            JSON.stringify(_edited[i])
          ).then(() => counter++);
        }
      }
      gettingData(productId);
      setEditedTiming([]);
      const result = _edited.length - counter;
      result > 0
        ? showError(`${result} مورد با خطا مواجه شد`)
        : showSuccess("عملیات زمان بندی با موفقیت انجام شد");
    }
  };

  useEffect(() => {
    if (editedTiming.length > 0) updatingPrograms();
  }, [editedTiming]);

  // useEffect(() =>{
  //   if(eventsDeleteitems.length !== 0){
  //     console.log('eventsDeleteitems !=0' , eventsDeleteitems)
  //   }
  // },[eventsDeleteitems])

  useEffect(() => {
    setOrder(channelPrograms.length + 1);
  }, [channelPrograms]);

  const disablingChannelHandler = async () => {
    productId &&
      (await channelAPI
        .delete(endpoints.CHANNELS(productId))
        .then(() => {
          gettingChannelStatus();
        })
        .catch((err) => console.log(err)));
  };

  useEffect(() => {
    if (productId) {
      gettingData(productId);
      gettingChannelStatus();
    }
  }, [productId]);

  const ChannelSubmitHandler = async () => {
    const time = channelStartTime?.split(":");
    const startTime = Number(time[0]) * 3600 + Number(time[1]) * 60;
    const requestBody = {
      imagePath,
      name: channelName,
      startTime,
    };
    if (productId) {
      await put(endpoints.CHANNELS(productId), JSON.stringify(requestBody))
        .then(() => {
          showSuccess("عملیات ویرایش با موفقیت انجام شد ");
        })
        .catch(() => {
          showError(" خطا در عملیات ویرایش");
        });
    } else {
      await post(endpoints.CHANNELS(), JSON.stringify(requestBody))
        .then(({ data }) => {
          setProductId(data.data.id);
          showSuccess("عملیات ایجاد شبکه با موفقیت انجام شد ");
        })
        .catch(() => {
          showError("خطا در عملیات  ایجاد شبکه");
        });
    }
  };

  const statusSwitchHandler = async (e) => {
    if (channelPrograms.length === 0) {
      showError("لطفا برنامه شبکه را ایجاد کنید");
    } else {
      if (e.value) {
        setChannelStatus(true);
        settingChannels(e.value);
      } else {
        setChannelStatus(false);
        disablingChannelHandler(e.value);
      }
    }
  };

  return (
    <AddChannelStyle>
      <ChannelSection>
        <div className="d-flex align-items-center mb-2 justify-content-between">
          <div className="title">
            {productId && channelName ? channelName : "ساخت شبکه جدید"}
          </div>
          <div className="d-flex align-items-center justify-content-center  ms-2 status">
            <label
              className="form-check-label ms-2 "
              htmlFor="flexSwitchCheckChecked"
            >
              وضعیت شبکه
            </label>
            <InputSwitch
              // disabled={channelPrograms.length === 0}
              checked={channelStatus}
              onChange={statusSwitchHandler}
            />
          </div>
        </div>
        <div>
          <h4 className="createTitle">اطلاعات شبکه</h4>
          <div className="fs-12 lh-description my-3">
            <p className="description-color">
              <span className="text-danger">* </span>
              جهت ساخت شبکه جدید فیلدهای زیر اجباری است
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex mt-2 align-items-center">
              <UploadImage
                minHeight={"110px"}
                isChannel={true}
                justRemove={true}
                field={IMAGES_ITEM_FIELD_TYPE_ENUMS.CHANNEL.label}
                value={imagePath}
                setFieldValue={setImagePath}
              />
              <div className="mx-3 d-flex align-items-center">
                <span className="d-block text-nowrap ms-2">نام شبکه</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="نام فارسی"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  required
                />
              </div>

              <div className="mx-3 col-4 d-flex align-items-center">
                <span className="d-block text-nowrap ms-2">ساعت شروع</span>
                <input
                  type="time"
                  className="form-control"
                  placeholder="00:00"
                  value={channelStartTime}
                  min="00:00"
                  max="23:59"
                  onChange={(e) => setChannelStartTime(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              onClick={ChannelSubmitHandler}
              className={`blueBtn mt-2 ${
                (!channelName || !imagePath) && "disabledBtn"
              }`}
            >
              {productId ? `ویرایش شبکه ${channelName}` : "ایجاد شبکه جدید"}
            </button>
          </div>
        </div>
      </ChannelSection>
      {productId && (
        <div className="channelContentSection">
          <h4 className="mt-3">جدول پخش برنامه‌های شبکه</h4>

          <ChannelContent
            channelId={productId}
            order={order}
            setChannelPrograms={setChannelPrograms}
          />
          <ChannelTiming
            disableHandler={disablingChannelHandler}
            activeHandler={settingChannels}
            channelStatus={channelStatus}
            setEditedTiming={setEditedTiming}
            channelPrograms={channelPrograms}
            setEventsDeleteItem={setEventsDeleteItem}
            eventsDeleteitems={eventsDeleteitems}
          />
        </div>
      )}
    </AddChannelStyle>
  );
};

export default AddChannel;
