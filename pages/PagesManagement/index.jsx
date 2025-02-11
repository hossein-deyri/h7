import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MainPageCustomizeStyle } from "./styles";
import { MainSlider, SpecialList } from "./components";
import TaggedImage from "components/page customize/TaggedImage";
import CarouselItem from "components/page customize/CarouselItem";
import BigDelimiter from "components/page customize/BigDelimiter";
import ActorSection from "components/page customize/ActorSection";
import NormalDelimiter from "components/page customize/NormalDelimiter";
import getTags from "services/tagsServices/getTags";
import getPersons from "services/personsServices/getPersons";
import getAllQueries from "services/queriesServices/getAllQueries";
import { IMAGES_ITEM_FIELD_TYPE_ENUMS } from "utilize/constant/constants";
import SeriesPreview from "./../../components/page customize/SeriesPreview/index";

const PagesManagement = ({ menuId }) => {
  const menus = useSelector((state) => state.menus);

  const [persons, setPersons] = useState([]);
  const [isTriggered, setIsTriggered] = useState(false);
  const [wholeTags, setWholeTags] = useState([]);
  const [allQueries, setAllQueries] = useState([]);
  const [isMainPage, setIsMainPage] = useState(false);
  const [isKidsPage, setIsKidsPage] = useState(false);
  const [isSliderAdded, setIsSliderAdded] = useState(false);

  useEffect(() => {
    (async () => {
      const tagsData = await getTags();
      const personsData = await getPersons();

      setWholeTags(tagsData);
      setPersons(personsData);
    })();
  }, []);

  useEffect(() => {
    const menuTitle = menus.find(
      ({ title, id }) => menuId.id === id && title.includes("کودک")
    );

    if (menuTitle && Object.keys(menuTitle).length) {
      setIsKidsPage(true);
    } else {
      setIsKidsPage(false);
    }
  }, [menus, menuId]);

  useEffect(() => {
    if (menuId.id) {
      setIsMainPage(false);
    } else {
      setIsMainPage(true);
    }
    setIsSliderAdded(false);
  }, [menuId]);

  useEffect(() => {
    if (menuId.id) {
      (async () => {
        const allQueriesData = await getAllQueries(menuId.id);

        setAllQueries(allQueriesData);
      })();
    }
  }, [menuId.id, isTriggered]);

  return (
    <MainPageCustomizeStyle>
      <div className=" mainContainer">
        <div className={`mb-4 ${isKidsPage && "d-none"}`}>
          <div className="sectionTitle">بارگذاری اسلایدر</div>
          <MainSlider menuId={menuId.id} />
        </div>
        {!isKidsPage && (
          <div className="my-4">
            <div className="sectionTitle">اسلایدرهای ویژه</div>
            <SpecialList menuId={menuId.id} />
          </div>
        )}
        <div className="my-4">
          {isMainPage && (
            <>
              <CarouselItem
                id={1}
                wholeTags={wholeTags}
                menuId={menuId.id}
                initialTag={menuId.tags[0]}
                persons={persons}
              />
              <CarouselItem
                id={2}
                menuId={menuId.id}
                initialTag={menuId.tags[0]}
                wholeTags={wholeTags}
                persons={persons}
              />
              <NormalDelimiter id={1} menuId={menuId.id} />
              <SeriesPreview menuId={menuId.id} />
              <ActorSection menuId={menuId.id} />
              {[3, 4].map((id) => (
                <CarouselItem
                  id={id}
                  key={id}
                  menuId={menuId.id}
                  initialTag={menuId.tags[0]}
                  wholeTags={wholeTags}
                  persons={persons}
                />
              ))}
              <CarouselItem
                id={5}
                menuId={menuId.id}
                initialTag={menuId.tags[0]}
                wholeTags={wholeTags}
                persons={persons}
              />
              <BigDelimiter id={1} menuId={menuId.id} />
              {[6, 7].map((id) => (
                <CarouselItem
                  id={id}
                  key={id}
                  wholeTags={wholeTags}
                  menuId={menuId.id}
                  initialTag={menuId.tags[0]}
                  persons={persons}
                />
              ))}
              <BigDelimiter id={2} menuId={menuId.id} />
              {[8, 9].map((id) => (
                <CarouselItem
                  id={id}
                  key={id}
                  wholeTags={wholeTags}
                  menuId={menuId.id}
                  initialTag={menuId.tags[0]}
                  persons={persons}
                />
              ))}
              <CarouselItem
                id={10}
                wholeTags={wholeTags}
                menuId={menuId.id}
                initialTag={menuId.tags[0]}
                persons={persons}
              />
            </>
          )}
          {!isMainPage && !isKidsPage && allQueries.length
            ? allQueries.map(({ id, title, tags, imagePath, ...rest }) => (
                <CarouselItem
                  key={id}
                  id={id}
                  menuId={menuId.id}
                  initialTag={menuId.tags[0]}
                  isTriggered={isTriggered}
                  persons={persons}
                  wholeTags={wholeTags}
                  imagePath={imagePath}
                  setIsTriggered={setIsTriggered}
                  setIsSliderAdded={setIsSliderAdded}
                />
              ))
            : null}
          {!isMainPage && !isKidsPage && isSliderAdded && (
            <CarouselItem
              menuId={menuId.id}
              initialTag={menuId.tags[0]}
              isTriggered={isTriggered}
              persons={persons}
              wholeTags={wholeTags}
              setIsTriggered={setIsTriggered}
              setIsSliderAdded={setIsSliderAdded}
            />
          )}
          {!isMainPage && !isKidsPage && (
            <button onClick={() => setIsSliderAdded(!isSliderAdded)}>
              اضافه کردن اسلایدر فیلم
            </button>
          )}
          {!isMainPage && isKidsPage && (
            <>
              {[12, 13].map((id) => (
                <CarouselItem
                  id={id}
                  key={id}
                  persons={persons}
                  menuId={menuId.id}
                  isKidsPage={isKidsPage}
                  wholeTags={wholeTags}
                  initialTag={menuId.tags[0]}
                  isTriggered={isTriggered}
                  setIsTriggered={setIsTriggered}
                  setIsSliderAdded={setIsSliderAdded}
                />
              ))}
              {!isMainPage && isKidsPage && (
                <TaggedImage
                  persons={persons}
                  wholeTags={wholeTags}
                  menuId={menuId.id}
                />
              )}
              {[14, 15].map((id) => (
                <CarouselItem
                  id={id}
                  key={id}
                  persons={persons}
                  menuId={menuId.id}
                  isKidsPage={isKidsPage}
                  wholeTags={wholeTags}
                  initialTag={menuId.tags[0]}
                  isTriggered={isTriggered}
                  setIsTriggered={setIsTriggered}
                  setIsSliderAdded={setIsSliderAdded}
                />
              ))}
              <BigDelimiter
                id={3}
                menuId={menuId.id}
                field={IMAGES_ITEM_FIELD_TYPE_ENUMS.KIDS_BANNER.label}
              />
              {[16, 17].map((id) => (
                <CarouselItem
                  id={id}
                  key={id}
                  persons={persons}
                  menuId={menuId.id}
                  isKidsPage={isKidsPage}
                  wholeTags={wholeTags}
                  initialTag={menuId.tags[0]}
                  isTriggered={isTriggered}
                  setIsTriggered={setIsTriggered}
                  setIsSliderAdded={setIsSliderAdded}
                />
              ))}
              <BigDelimiter id={4} menuId={menuId.id} />
              {[18, 19].map((id) => (
                <CarouselItem
                  id={id}
                  key={id}
                  persons={persons}
                  menuId={menuId.id}
                  isKidsPage={isKidsPage}
                  wholeTags={wholeTags}
                  initialTag={menuId.tags[0]}
                  isTriggered={isTriggered}
                  setIsTriggered={setIsTriggered}
                  setIsSliderAdded={setIsSliderAdded}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </MainPageCustomizeStyle>
  );
};

export default PagesManagement;
