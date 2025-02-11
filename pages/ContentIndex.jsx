import React, { useState, useEffect, memo } from "react";
import { PanelMenu } from "primereact/panelmenu";
import { NAV_SIDE } from "utilize/constant/constants";
import AddContent from "pages/content/add/AddContent";
import ShowContent from "pages/content/show/ShowContent";
import AddPerson from "./person/add/AddPerson";
import ShowPerson from "pages/person/show/ShowPerson";
import ShowCountries from "pages/countries/ShowCountries";
import ShowOwner from "pages/owner/ShowOwner";
import ShowTag from "pages/tag/ShowTag";
import nobinoLogoSmall from "statics/img/nobinoLogoSmall.png";
import { ShutDown } from "@styled-icons/remix-line/ShutDown";
import UserInfo from "../components/common/UserInfo";
import ShowChannel from "pages/Channel/ShowChannel/ShowChannel";
import AddChannel from "pages/Channel/AddChannel/AddChannel";
import Customer from "pages/Customer/Customer";
import LivePage from "pages/LivePage";
import LiveContent from "pages/LiveContent";
import RolePage from "pages/RolePage";
import MenuManagement from "./MenuManagement";
import { RoleContext } from "utilize/contexts/roleContext";
import { ContentIndexStyle } from "./ContentIndexStyle";
import { get } from "services/httpService";
import { endpoints } from "endpoints";
import PagesManagement from "./PagesManagement";
import PlansPage from "./PlansManagement";
import { useDispatch, useSelector } from "react-redux";
import getTags from "services/tagsServices/getTags";
import getAllMenus from "services/menusServices/getAllMenus";
import getPersons from "services/personsServices/getPersons";
import { storeTags } from "redux/slices/tagsSlice";
import { storeMenus } from "redux/slices/menusSlice";
import { storePersons } from "redux/slices/personsSlice";
import Subscribers from "pages/Subscribers/Subscribers";
import CustomerSubscription from "pages/CustomerSubscription/CustomerSubscription";
import ShowCategory from "pages/Category/ShowCategory";
import AddCategory from "pages/Category/AddCategory";
import DiscountManagement from "./DiscountManagement";
import ReportManagement from "./ReportMahagement";
import ProductDetails from "./content/productDetails/ProductDetails";
import UsersDetails from "./Subscribers/usersDetails/UsersDetails";
import AdCustomersList from "./adCustomers/adCustomersList/AdCustomersList";
import CreateAd from "./advertisements/createAd/CreateAd";
import AdsList from "./advertisements/adsList/AdsList";
import CreateAdCustomers from "./adCustomers/createAdCustomers/CreateAdCustomers";
import { showError } from "utilize/toast";

function ContentIndex({ setLoginState }) {
  const dispatch = useDispatch();
  const menusDataRedux = useSelector((state) => state.menus);

  const [navSideMenu, setNavSideMenu] = useState(NAV_SIDE.MENU.DASHBOARD);
  const [productID, setProductID] = useState(null);
  const [roles, setRoles] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [resetAdd, setResetAdd] = useState(true);
  const [menuState, setMenuState] = useState([]);
  const [history, setHistory] = useState(navSideMenu);
  const [menuId, setMenuId] = useState("");

  /**
   * get:
   *    tags
   *    menus
   *    persons
   * data and set them in redux
   */
  useEffect(() => {
    (async () => {
      const tagsData = await getTags();
      const menusData = await getAllMenus();
      const personsData = await getPersons();

      dispatch(storeTags(tagsData));
      dispatch(storeMenus(menusData));
      dispatch(storePersons(personsData));
    })();
  }, []);

  let timer = null;
  const logOutUser = () => {};
  const resetTimer = () => {
    clearTimeout(timer);
    logOutUser();
  };
  const gettingUserData = async () => {
    await get(endpoints.USERS.ME)
      .then(({ data }) => {
        setUserInfo(data);
        setRoles(data.roles);
      })
      .catch((error) => showError(error));
  };
  useEffect(() => {
    gettingUserData();
    // let refreshTimer = null;
    resetTimer();
    // TODO: @hosein: Replace refresh token with sso refresh token

    // refreshTimer = setInterval(async () => {
    //   if (isUserActive) {
    //     await get(endpoints.USERS.REFRESH)
    //       .then(({ data }) => {
    //         localStorage.setItem("API_TOKEN", data);
    //         http.defaults.headers.common["Authorization"] = `Bearer ${data}`;
    //         resetTimer();
    //       })
    //       .catch((err) => console.log(err));
    //   }
    // }, 0.9 * 60 * 1000);
    return () => {
      // clearInterval(refreshTimer);
      clearTimeout(timer);
    };
  }, []);

  const logoutHandler = () => {
    localStorage.clear();
    setLoginState(false);
  };
  const setNavSideMenuHandler = (navSideMenuInput) => {
    setNavSideMenu(navSideMenuInput);
    resetTimer();
  };

  useEffect(() => {
    if (roles.length > 0) {
      const _roles = [];
      roles.includes("ROLE_CAN_VIEW_PRODUCT") &&
        _roles.push({
          label: "مدیریت محتوا ",
          // icon: "pi pi-fw pi-file",
          command: () => {
            setHistory(navSideMenu);
            resetTimer();
            setNavSideMenuHandler(NAV_SIDE.MENU.SHOW_CONTENT);
          },
        });

      roles.includes("ROLE_CAN_VIEW_CUSTOM_PAGE") &&
        _roles.push({
          label: "مدیریت منو",
          // icon: "pi pi-fw pi-list",
          command: () => {
            resetTimer();
            setNavSideMenuHandler(NAV_SIDE.MENU.MENU_MANAGEMENT);
          },
        });

      roles.includes("ROLE_CAN_VIEW_MAIN_PAGE") &&
        _roles.push({
          label: "مدیریت صفحه اصلی",
          // icon: "pi pi-fw pi-list",
          command: () => {
            resetTimer();
            setMenuId({ id: "", tags: [] });
            setNavSideMenuHandler(NAV_SIDE.MENU.MAIN_PAGE_CUSTOMIZE);
          },
        });

      roles.includes("ROLE_CAN_VIEW_CUSTOM_PAGE") &&
        _roles.push({
          label: "مدیریت صفحه اختصاصی",
          items: menusDataRedux
            .filter(({ link }) => !link)
            .map(({ title, id, tags }) => ({
              label: title,
              command: () => {
                setMenuId({ id, tags });
                setNavSideMenuHandler(NAV_SIDE.MENU.MAIN_PAGE_CUSTOMIZE);
              },
            })),
        });

      roles.includes("ROLE_CAN_VIEW_PRODUCT") &&
        _roles.push({
          label: "مدیریت دسته بندی",
          // icon: "pi pi-fw pi-chevron-circle-up",
          command: () => {
            resetTimer();
            setNavSideMenuHandler(NAV_SIDE.MENU.SHOW_CATEGORY);
          },
        });

      roles.includes("ROLE_CAN_VIEW_CHANNEL") &&
        _roles.push({
          label: "مدیریت شبکه ها ",
          // icon: "pi pi-fw pi-align-right",
          command: () => {
            resetTimer();
            setNavSideMenuHandler(NAV_SIDE.MENU.SHOW_CHANNEL);
          },
        });

      roles.includes("ROLE_CAN_VIEW_LIVE") &&
        _roles.push(
          {
            label: "برنامه های  رویداد",
            // icon: "pi pi-fw  pi-video",
            command: () => {
              resetTimer();
              setNavSideMenuHandler(NAV_SIDE.MENU.SHOW_LIVE_CONTENT);
            },
          },
          {
            label: "مدیریت صفحه  رویداد",
            // icon: "pi pi-fw pi-play",
            command: () => {
              resetTimer();
              setNavSideMenuHandler(NAV_SIDE.MENU.SHOW_LIVE_PAGE);
            },
          }
        );

      roles.includes("ROLE_CAN_VIEW_USER") &&
        _roles.push({
          label: "مدیریت کاربران",
          // icon: "pi pi-fw pi-users",
          command: () => {
            resetTimer();
            setNavSideMenuHandler(NAV_SIDE.MENU.SHOW_SUBSCRIBERS);
          },
        });

      roles.includes("ROLE_CAN_VIEW_PLAN") &&
        _roles.push({
          label: "مدیریت بسته ها",
          // icon: "pi pi-fw pi-money-bill",
          command: () => {
            resetTimer();
            setNavSideMenuHandler(NAV_SIDE.MENU.SHOW_PLAN_PAGE);
          },
        });

      (roles.includes("ROLE_CAN_VIEW_ADVERTISEMENT") ||
        roles.includes("ROLE_CAN_VIEW_ADVERTISEMENT_CUSTOMER")) &&
        _roles.push({
          label: "تبلیغات",
          items: [
            ...((roles.includes("ROLE_CAN_VIEW_ADVERTISEMENT") && [
              {
                label: "لیست تبلیغات",
                command: () => {
                  setMenuId({ id: "adList", tags: ["adList"] });
                  setNavSideMenuHandler(NAV_SIDE.MENU.ADS_LIST);
                },
              },
            ]) ||
              []),
            ...((roles.includes("ROLE_CAN_VIEW_ADVERTISEMENT_CUSTOMER") && [
              {
                label: "لیست مشتریان",
                command: () => {
                  setMenuId({ id: "customerList", tags: ["customerList"] });
                  setNavSideMenuHandler(NAV_SIDE.MENU.CUSTOMER_LIST);
                },
              },
            ]) ||
              []),
          ],
        });

      // roles.includes("ROLE_CAN_VIEW_PLAN") &&
      _roles.push({
        label: "مدریت گزارش ها",
        // icon: "pi pi-fw pi-money-bill",
        command: () => {
          resetTimer();
          setNavSideMenuHandler(NAV_SIDE.MENU.SHOW_REPORT);
        },
      });

      roles.includes("ROLE_CAN_VIEW_DISCOUNT") &&
        _roles.push({
          label: "مدیریت تخفیف ها",
          // icon: "pi pi-fw pi-money-bill",
          command: () => {
            resetTimer();
            setNavSideMenuHandler(NAV_SIDE.MENU.DISCOUNT_PAGE);
          },
        });

      roles.includes("ROLE_CAN_VIEW_SUBSCRIPTION") &&
        _roles.push({
          label: "مدیریت اشتراک ها",
          // icon: "pi pi-fw pi-users" ,
          command: () => {
            resetTimer();
            setNavSideMenuHandler(NAV_SIDE.MENU.SHOW_SUBSCRIBERS_CUSTOMER);
          },
        });

      roles.includes("ROLE_CAN_VIEW_PERSON") &&
        _roles.push({
          label: "مدیریت اشخاص",
          // icon: "pi pi-fw pi-user",
          command: () => {
            resetTimer();
            setNavSideMenuHandler(NAV_SIDE.MENU.SHOW_PERSON);
          },
        });

      roles.includes("ROLE_CAN_VIEW_TAG") &&
        _roles.push({
          label: " مدیریت تگ ها",
          // icon: "pi pi-fw pi-tags",
          command: () => {
            resetTimer();
            setNavSideMenuHandler(NAV_SIDE.MENU.SHOW_TAG);
          },
        });

      roles.includes("ROLE_CAN_VIEW_COUNTRY") &&
        _roles.push({
          label: "مدیریت کشور",
          // icon: "pi pi-fw pi-flag",
          command: () => {
            resetTimer();
            setNavSideMenuHandler(NAV_SIDE.MENU.SHOW_COUNTRIES);
          },
        });

      roles.includes("ROLE_CAN_VIEW_OWNER") &&
        _roles.push({
          label: "مدیریت مالک",
          // icon: "pi pi-fw pi-chevron-circle-up",
          command: () => {
            resetTimer();
            setNavSideMenuHandler(NAV_SIDE.MENU.SHOW_OWNER);
          },
        });

      // roles.includes("ROLE_CAN_VIEW_USER") &&
      //   _roles.push({
      //     label: "مدیریت کاربران",
      //     // icon: "pi pi-fw pi-users",
      //     command: () => {
      //       resetTimer();
      //       setNavSideMenuHandler(NAV_SIDE.MENU.SHOW_CUSTOMER);
      //     },
      //   });

      roles.includes("ROLE_CAN_VIEW_ROLE") &&
        _roles.push({
          label: "مدیریت دسترسی ها",
          // icon: "pi pi-fw pi-check-circle",
          command: () => {
            resetTimer();
            setNavSideMenuHandler(NAV_SIDE.MENU.SHOW_ROLE_PAGE);
          },
        });
      // roles.includes("ROLE_CAN_PUBLISH_PRODUCT") &&
      //   _roles.push({
      //     label: "انتشار محتوا ",
      //     icon: "pi pi-fw pi-check-square",

      //     command: () => {
      //       resetTimer();
      //       setNavSideMenuHandler(NAV_SIDE.MENU.SHOW_CONTENT_PUBLISH);
      //     },
      //   });

      // roles.includes("ROLE_CAN_VIEW_OWNER") &&
      // _roles.push({
      //   label: "ساخت دسته بندی",
      //   // icon: "pi pi-fw pi-chevron-circle-up",
      //   command: () => {
      //     resetTimer();
      //     setNavSideMenuHandler(NAV_SIDE.MENU.ADD_CATEGORY);
      //   },
      // });
      setMenuState(_roles);
    }
  }, [roles, menusDataRedux]);

  return (
    <ContentIndexStyle className="">
      <div className="header  " style={{ height: "70px" }}>
        <div className="d-flex align-items-center w-100 justify-content-between px-4">
          <div className="d-flex align-items-center justify-content-between">
            <img src={nobinoLogoSmall} alt="nobino" />
            <h2>نوبینو</h2>
          </div>
          <div className="me-auto">
            <div className="logoutHolder" onClick={logoutHandler}>
              <ShutDown />
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 ps-2 border h-100">
        <div className="g-0 d-flex fullHeight  w-100 ">
          <div className="navSide position-relative mt-1">
            <div className="card posSticky">
              <UserInfo userInfo={userInfo} />
              <button
                className="dashboardBtn"
                onClick={() => setNavSideMenuHandler(NAV_SIDE.MENU.DASHBOARD)}
              >
                داشبورد ادمین
              </button>
              <PanelMenu model={menuState} />
            </div>
          </div>
          <RoleContext.Provider value={roles}>
            <div className="content pe-2 mt-3 ">
              {navSideMenu === NAV_SIDE.MENU.DASHBOARD && (
                <>
                  <span></span>
                  <h1 className="text-center mt-5">
                    به پنل ادمین نوبینو خوش آمدید.
                  </h1>
                </>
              )}
              {navSideMenu === NAV_SIDE.MENU.USERS_DETAILS && (
                <UsersDetails productID={productID} />
              )}
              {navSideMenu === NAV_SIDE.MENU.ADD_CONTENT && (
                <AddContent key={resetAdd} />
              )}
              {navSideMenu === NAV_SIDE.MENU.EDIT_CONTENT && (
                <AddContent productID={productID} />
              )}
              {navSideMenu === NAV_SIDE.MENU.SHOW_CONTENT && (
                <ShowContent
                  setNavSideMenu={setNavSideMenu}
                  setProductID={setProductID}
                />
              )}
              {navSideMenu === NAV_SIDE.MENU.SHOW_CONTENT_PUBLISH && (
                <ShowContent
                  setNavSideMenu={setNavSideMenu}
                  notPublished
                  setProductID={setProductID}
                />
              )}
              {navSideMenu === NAV_SIDE.MENU.ADD_PERSON && <AddPerson />}
              {navSideMenu === NAV_SIDE.MENU.SHOW_PERSON && <ShowPerson />}
              {navSideMenu === NAV_SIDE.MENU.SHOW_COUNTRIES && (
                <ShowCountries />
              )}
              {navSideMenu === NAV_SIDE.MENU.SHOW_TAG && <ShowTag />}
              {navSideMenu === NAV_SIDE.MENU.SHOW_OWNER && <ShowOwner />}
              {navSideMenu === NAV_SIDE.MENU.ADD_CHANNEL && (
                <AddChannel key={resetAdd} />
              )}
              {navSideMenu === NAV_SIDE.MENU.EDIT_CHANNEL && (
                <AddChannel productID={productID} />
              )}
              {navSideMenu === NAV_SIDE.MENU.SHOW_CHANNEL && (
                <ShowChannel
                  setNavSideMenu={setNavSideMenu}
                  setProductID={setProductID}
                />
              )}
              {navSideMenu === NAV_SIDE.MENU.MENU_MANAGEMENT && (
                <MenuManagement />
              )}
              {navSideMenu === NAV_SIDE.MENU.MAIN_PAGE_CUSTOMIZE && (
                <PagesManagement menuId={menuId} />
              )}
              {navSideMenu === NAV_SIDE.MENU.SHOW_CUSTOMER && <Customer />}
              {navSideMenu === NAV_SIDE.MENU.SHOW_SUBSCRIBERS && (
                <Subscribers
                  setNavSideMenu={setNavSideMenu}
                  setProductID={setProductID}
                />
              )}
              {navSideMenu === NAV_SIDE.MENU.SHOW_SUBSCRIBERS_CUSTOMER && (
                <CustomerSubscription />
              )}
              {navSideMenu === NAV_SIDE.MENU.SHOW_CATEGORY && (
                <ShowCategory
                  setNavSideMenu={setNavSideMenu}
                  setProductID={setProductID}
                />
              )}
              {navSideMenu === NAV_SIDE.MENU.ADD_CATEGORY && (
                <AddCategory key={resetAdd} />
              )}
              {navSideMenu === NAV_SIDE.MENU.EDIT_CATEGORY && (
                <AddCategory productID={productID} />
              )}

              {navSideMenu === NAV_SIDE.MENU.SHOW_LIVE_PAGE && <LivePage />}
              {navSideMenu === NAV_SIDE.MENU.SHOW_LIVE_CONTENT && (
                <LiveContent />
              )}
              {navSideMenu === NAV_SIDE.MENU.SHOW_ROLE_PAGE && <RolePage />}
              {navSideMenu === NAV_SIDE.MENU.SHOW_PLAN_PAGE && <PlansPage />}
              {navSideMenu === NAV_SIDE.MENU.SHOW_REPORT && (
                <ReportManagement />
              )}

              {navSideMenu === NAV_SIDE.MENU.DISCOUNT_PAGE && (
                <DiscountManagement />
              )}
              {navSideMenu === NAV_SIDE.MENU.PRODUCT_DETAILS && (
                <ProductDetails productID={productID} />
              )}
              {navSideMenu === NAV_SIDE.MENU.ADS_LIST && (
                <AdsList setNavSideMenuHandler={setNavSideMenuHandler} />
              )}
              {navSideMenu === NAV_SIDE.MENU.CREATE_AD && (
                <CreateAd setNavSideMenuHandler={setNavSideMenuHandler} />
              )}
              {navSideMenu === NAV_SIDE.MENU.CUSTOMER_LIST && (
                <AdCustomersList
                  setNavSideMenu={setNavSideMenu}
                  setProductID={setProductID}
                />
              )}
              {navSideMenu === NAV_SIDE.MENU.CREATE_AD_CUSTOMER && (
                <CreateAdCustomers
                  setNavSideMenu={setNavSideMenu}
                  productID={productID}
                />
              )}
            </div>
          </RoleContext.Provider>
        </div>
      </div>
    </ContentIndexStyle>
  );
}

export default memo(ContentIndex);
