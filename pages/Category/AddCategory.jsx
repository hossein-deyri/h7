import React, { useState, useEffect } from "react";
import { getCategoriesMainPageById } from "services/categoriesServices/getCategories";
import { postCategoriesMainPage } from "services/categoriesServices/postCategories";
import patchCategories from "services/categoriesServices/patchCategories";
import UploadImage from "components/content/add/upload/image";
import { IMAGES_ITEM_FIELD_TYPE_ENUMS } from "utilize/constant/constants";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { get } from "services/httpService";
import { endpoints } from "endpoints";
import { AiOutlineSave } from "react-icons/ai";
import { AddCategoryStyles } from "./AddCategoryStyles";

export default function AddCategory({ productID }) {
  const [name, setName] = useState();
  const [rightImage, setRightImage] = useState();
  const [SSRTags, setSSRTags] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  useEffect(() => {
    (async () => {
      if (productID !== undefined) {
        try {
          const { data, status } = await get(endpoints.TAGS());
          if (status !== 200)
            throw Error("There was a problem in fetching tags data.");
          setSSRTags(data.data);
        } catch (e) {
          Promise.reject(e);
        }

        try {
          const editCategoryData = await getCategoriesMainPageById(productID);
          setName(editCategoryData.name);
          if (editCategoryData.image) {
            setRightImage(editCategoryData.image);
          } else {
            setRightImage(null);
          }
          let dataTags = [];
          editCategoryData.tags.map(async (item) => {
            const { data } = await get(endpoints.TAGS(item));
            dataTags.push(data.data);
            let uniqueChars = [...new Set(dataTags)];
            const newArr = uniqueChars
              // .filter((i) => i.fixed)
              .map((tag) => ({
                value: tag.id,
                label: tag.name,
              }));
            setSelectedOption([...newArr]);
          });
        } catch (err) {
          return Promise.reject(err);
        }
      } else {
        try {
          const { data, status } = await get(endpoints.TAGS());

          if (status !== 200)
            throw Error("There was a problem in fetching tags data.");
          setSSRTags(data.data);
        } catch (e) {
          Promise.reject(e);
        }
      }
    })();
  }, [productID]);

  const previewHandler = async () => {
    const requestBody = {
      name: name,
      image: rightImage?.replace(/^.*\/\/[^\/]+/, ""),
      tags: selectedOption.map((item) => item.value),
    };

    if (productID !== undefined) {
      await patchCategories(JSON.stringify(requestBody), productID);
    } else {
      await postCategoriesMainPage(JSON.stringify(requestBody));
    }
  };

  const selectStyle = {
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#3e8bff",
      display: "flex",
      borderRadius: "5px",
      padding: "2px 4px",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#e21221",
      order: 1,
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white",
      fontSize: "12px",
      order: 2,
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "#f3f5f8",
    }),
  };

  return (
    <AddCategoryStyles>
      <div className="sectionTitle">دسته بندی</div>
      <div className="row">
        <div className="col-6">
          <div className="imageHolder ">
            <div className="image ">
              <span className="mb-3 d-block">تصویر دسته بندی</span>
              <UploadImage
                minHeight="240px "
                field={IMAGES_ITEM_FIELD_TYPE_ENUMS.BIG_DELIMITER.label}
                value={rightImage}
                CSSClass="smallImages bigWidth"
                setFieldValue={setRightImage}
                htmlContent={"200 * 370"}
              />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="titleHolder mb-3">
            <span className="mb-3 d-block mt-5">نام </span>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="لطفا نام را وارد کنید"
            />
          </div>
          <div className="titleHolder mb-3">
            <span className="mb-3 d-block">انتخاب تگ </span>
            <Select
              isMulti
              components={makeAnimated()}
              options={SSRTags
                // .filter((i) => i.fixed)
                .map((tag) => ({
                  value: tag.id,
                  label: tag.name,
                }))}
              value={selectedOption}
              onChange={setSelectedOption}
              placeholder=""
              styles={selectStyle}
              // onChange={(value, e) => setFieldValue("tags", value)}
              // className={`${
              //   touched.tags
              //     ? errors.tags
              //       ? "border border-danger rounded"
              //       : "border border-success rounded"
              //     : ""
              // }`}
            />
          </div>
        </div>
      </div>

      <div className="container-btn" style={{}}>
        <button onClick={previewHandler} className="saveBtn mt-3">
          ذخیره
          <AiOutlineSave style={{ margin: "0 10px" }} />
        </button>
      </div>
    </AddCategoryStyles>
  );
}
