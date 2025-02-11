import React, { useState, useEffect } from "react";
import Select from "react-select";
import { RadioButton } from "primereact/radiobutton";

import { MenuStyle } from "./styles";
import { endpoints } from "endpoints";
import { personsRole } from "utilize/data/data";
import { get, post } from "services/httpService";
import { showSuccess, showError } from "utilize/toast";
import { Drag } from "@styled-icons/fluentui-system-filled/Drag";
import { EyeSlash } from "@styled-icons/bootstrap/EyeSlash";
import { Eye } from "@styled-icons/feather/Eye";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import postMenus from "services/menusServices/postAllMenus";
import { storeMenus } from "redux/slices/menusSlice";
// import deleteMenus from "services/menusServices/deleteMenus";
import { MenuOutline } from "@styled-icons/evaicons-outline/MenuOutline";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { Pencil } from "@styled-icons/bootstrap/Pencil";
import { Save } from "@styled-icons/boxicons-regular/Save";
import getByIdMenus from "services/menusServices/getByIdMenus";
import patchByIdMenus from "services/menusServices/patchByIdMenus";
import patchAllMenus from "services/menusServices/patchAllMenus";
import getAllMenus from "services/menusServices/getAllMenus";

const MenuManagement = ({ id, ...props }) => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags);
  const persons = useSelector((state) => state.persons);
  const menusDataRedux = useSelector((state) => state.menus);

  const [role, setRole] = useState("");
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [menus, setMenus] = useState([]);
  const [enTitle, setEnTitle] = useState("");
  const [endYear, setEndYear] = useState("");
  const [, setPreviewMode] = useState(false);
  const [tagState, setTagState] = useState([]);
  const [personId, setPersonId] = useState("");
  const [menuItem, setMenuItem] = useState({});
  const [startYear, setStartYear] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [menuMode, setMenuMode] = useState("search");

  useEffect(() => {
    if (menus && !menus.length) setMenus(menusDataRedux);
  }, [menusDataRedux]);

  useEffect(() => {
    if (menuItem?.tags?.length) {
      const initialTags = [];
      for (const tag in menuItem.tags) {
        const a = tags.filter(({ value }) => value === menuItem.tags[tag]);
        initialTags.push(...a);
      }
      setTagState(initialTags);
    }

    if (menuItem?.title) setTitle(menuItem.title);
    if (menuItem?.englishTitle) setEnTitle(menuItem.englishTitle);
    if (menuItem?.link) {
      setLink(menuItem.link);
      setMenuMode("linkMode");
    }
  }, [menuItem]);

  const getAllMenusData = async () => {
    const menusData = await getAllMenus();
    setMenus(menusData);
    dispatch(storeMenus(menusData));

    return menusData;
  };

  const inputChangeHandler = (setState, e) => {
    setState(e.target.value);
  };

  const dragEndHandler = async (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (source.index === destination.index) {
      return;
    }

    let _menus = [...menus];
    const _draggedProduct = _menus[source.index];
    _menus.splice(source.index, 1);
    _menus.splice(destination.index, 0, _draggedProduct);

    const sortedMenu = _menus.map(({ sort, ...rest }, index) => ({
      sort: index + 1,
      ...rest,
    }));
    setMenus(sortedMenu);

    await patchAllMenus(sortedMenu);

    return showSuccess("سورت شدن با موفقیت انجام شد.");
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    background: "#F2F2F2",
    color: "#000000",
    ...draggableStyle,
  });

  const resetHandler = () => {
    setPreviewMode(false);
    setTitle("");
    setEnTitle("");
    setStartYear("");
    setEndYear("");
    setTagState([]);
    setPersonId("");
    setRole("");
    setLink("");
  };
  const selectStyle = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#f3f5f8",
      borderRadius: "5px",
      border: "none",
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "#919baa",
        fontSize: "14px",
      };
    },
  };

  const creatingMenu = async () => {
    const re = new RegExp(/^[A-Za-z][A-Za-z0-9]*$/);

    if (!re.test(enTitle))
      return showError("لطفا فیلد انگلیسی را درست وارد کنید");

    const englishTitle = enTitle.toLocaleLowerCase().replaceAll(" ", "-");
    const menusTemp = [...menus];

    const queryBody = {
      endYear: null,
      englishTitle,
      link: link ? link : null,
      personId: null,
      role: null,
      sort: 0,
      startYear: null,
      status: "ACTIVE",
      tags: tagState ? tagState.map((tag) => tag?.value) : null,
      title: title,
    };
    setMenus((e) => [...e, queryBody]);

    menusTemp.push(queryBody);
    const menuData = await postMenus(JSON.stringify(queryBody));
    dispatch(storeMenus(menusTemp));

    resetHandler();
  };

  const updatingMenuById = async (id) => {
    const re = new RegExp(/^[A-Za-z][A-Za-z0-9]*$/);

    if (!re.test(enTitle))
      return showError("لطفا فیلد انگلیسی را درست وارد کنید");

    const englishTitle = enTitle.toLocaleLowerCase().replaceAll(" ", "-");

    const payload = {
      endYear: null,
      englishTitle,
      link: link || "",
      personId: null,
      role: null,
      sort: menuItem.sort,
      startYear: null,
      status: menuItem.status,
      tags: tagState ? tagState.map((tag) => tag?.value) : null,
      title: title,
    };

    await patchByIdMenus(id, payload);
    await getAllMenusData();
    return showSuccess("آپدیت با موفقیت انجام شد.");
  };

  const inActiveMenu = async (id, status) => {
    const payload = {
      status: status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
    };

    await patchByIdMenus(id, payload);
    await getAllMenusData();
  };

  const editMenuById = async (id) => {
    const data = await getByIdMenus(id);
    setMenuItem(data);
  };

  const setChanges = async () => {
    if (menuItem?.id) {
      updatingMenuById(menuItem.id);
    } else {
      creatingMenu();
    }

    setTagState([]);
    setTitle("");
    setEnTitle("");
    setLink("");
    setMenuMode("search");
  };

  return (
    <>
      <MenuStyle>
        <h4 className="mainTitle">
          <span className="filmIconHolder">
            <MenuOutline />
          </span>
          مدیریت منو
        </h4>
        <div className="creationHolder">
          <div className="row custom-margin">
            <div className="titleHolder col-6">
              {/* <span>عنوان</span> */}
              <input
                className="form-control"
                type="text"
                placeholder="نوشتن عنوان منو"
                value={title}
                onChange={inputChangeHandler.bind(this, setTitle)}
              />
            </div>
            <div className="titleHolder col-6">
              {/* <span>عنوان انگلیسی</span> */}
              <input
                className="form-control"
                type="text"
                placeholder="نوشتن عنوان انگلیسی منو"
                value={enTitle}
                onChange={inputChangeHandler.bind(this, setEnTitle)}
              />
            </div>
          </div>

          <div className="row custom-margin">
            <div className="col-3">
              <div className="field-radiobutton">
                <RadioButton
                  inputId="search"
                  name="menuMode"
                  value="search"
                  onChange={(e) => {
                    setLink("");
                    setMenuMode(e.value);
                  }}
                  checked={menuMode === "search"}
                />
                <label htmlFor="search">صفحه اختصاصی</label>
              </div>
              <div className="field-radiobutton">
                <RadioButton
                  inputId="linkMode"
                  name="menuMode"
                  value="linkMode"
                  onChange={(e) => setMenuMode(e.value)}
                  checked={menuMode === "linkMode"}
                />
                <label htmlFor="linkMode">لینک</label>
              </div>
            </div>
          </div>

          <div className="row custom-margin">
            <div
              className={`tagHolder col-6 ${
                menuMode !== "search" && "disabled"
              }`}
            >
              {/* <span>تگ ها</span> */}
              <div className="col-11">
                <Select
                  styles={selectStyle}
                  options={tags}
                  isMulti
                  placeholder="حداکثر 3 تگ انتخاب نمایید"
                  value={tagState}
                  onChange={(value) => setTagState(value)}
                />
              </div>
            </div>
          </div>

          <div
            className={`row custom-margin ${
              menuMode !== "linkMode" && "disabled"
            }`}
          >
            <div className="titleHolder col-12">
              <input
                className="form-control"
                type="text"
                placeholder="لینک"
                value={link}
                onChange={inputChangeHandler.bind(this, setLink)}
              />
            </div>
          </div>

          <div className="row custom-margin">
            <div className="col-12 divider" />
          </div>
        </div>

        <h4 className="mainTitle custom-margin">منو فعلی</h4>

        {menus ? (
          <div>
            <DragDropContext onDragEnd={dragEndHandler}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="menu-wrapper"
                  >
                    {menus.map((menu, index) => (
                      <Draggable
                        key={menu.id}
                        draggableId={menu.title}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                            className="menuHolder"
                          >
                            <span>{menu.title}</span>

                            <div
                              className="editHolder"
                              onClick={() => editMenuById(menu.id)}
                            >
                              <Pencil />
                            </div>
                            <div
                              className="menu-item-divider"
                              style={{ left: "3.75rem" }}
                            />
                            <div
                              className="closeHolder"
                              onClick={() => inActiveMenu(menu.id, menu.status)}
                            >
                              {menu.status === "INACTIVE" ? (
                                <EyeSlash />
                              ) : (
                                <Eye />
                              )}
                            </div>
                            <div className="menu-item-divider" />
                            <div
                              {...provided.dragHandleProps}
                              className="dragHolder"
                            >
                              <Drag />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        ) : null}

        <div className="d-flex align-items-center justify-content-start mt-3">
          <button
            onClick={setChanges}
            className="my-3 submitBtn"
            style={{ background: "#E21221", color: "#ffffff" }}
          >
            <div
              className="closeHolder"
              style={{ width: "20px", marginLeft: "7px" }}
            >
              <Save />
            </div>
            ذخیره
          </button>
        </div>
      </MenuStyle>
    </>
  );
};

export default MenuManagement;
