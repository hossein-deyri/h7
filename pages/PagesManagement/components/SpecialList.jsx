import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SpecialListStyle } from "../styles";
import { showError } from "utilize/toast";
import SpecialItem from "components/page customize/SpecialItem";
import getSpecials from "services/specialsServices/getSpecials";
import postSpecials from "services/specialsServices/postSpecials";
import { useHorizontalScroll } from "hooks/useHorizontalScroll";

const SpecialList = ({ menuId }) => {
  const [loading, setLoading] = useState(false);
  const [sliderState, setSliderState] = useState([{ isPlaceholder: true }]);
  const scrollRef = useHorizontalScroll();

  useEffect(() => {
    const fetchSpecials = async () => {
      setLoading(true);
      try {
        const specialSliderData = await getSpecials(menuId);
        const reversedSpecialSliderData = specialSliderData.reverse();
        setSliderState([...reversedSpecialSliderData, { isPlaceholder: true }]);
      } catch (error) {
        showError("خطا در دریافت لیست ویژه ها");
      } finally {
        setLoading(false);
      }
    };

    fetchSpecials();
  }, [menuId]);

  const settingSliders = async () => {
    try {
      setLoading(true);

      const filteredSliderState = sliderState.filter(
        (item) => item && !item.isPlaceholder
      );

      const updatedSliderState = filteredSliderState.map((item) => {
        if (item.product) {
          item.productId = item.product.id;
        }
        if (menuId) {
          item.menuIdList = [menuId];
        }
        return item;
      });

      await postSpecials(menuId, JSON.stringify(updatedSliderState));
    } catch (error) {
      showError("خطا در به روز رسانی اسلاید ها");
    } finally {
      setLoading(false);
    }
  };

  const handleSlideChange = (index, newSlide) => {
    const newSlides = [...sliderState];
    newSlides[index] = newSlide;
    if (index === sliderState.length - 1 && !newSlides[index].isPlaceholder) {
      newSlides.push({ isPlaceholder: true });
    }
    setSliderState(newSlides);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (
      sliderState[sourceIndex].isPlaceholder ||
      destinationIndex === sliderState.length - 1
    ) {
      return;
    }

    const items = Array.from(sliderState);
    const [reorderedItem] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, reorderedItem);

    setSliderState(items);
  };

  const grid = 8;

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "#e6f3ff" : "#fff",
    padding: grid,
    width: "300px",
    height: "490px",
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid,
    margin: 0,
    borderRadius: "10px",
    background: isDragging ? "#90EE90" : "#D3D3D3",
    ...draggableStyle,
  });

  return (
    <SpecialListStyle>
      <div className="fs-12 lh-description my-1">
        <p className="description-color">
          <span className="text-danger">* </span>
          اسلایدر وب با فرمت بوده و نسبت تناسب آن ۲:1 و اندازه آن 580*290 میابشد
        </p>
        <p className="description-color">
          <span className="text-danger">* </span>
          ترجیحا حجم فایل جهت آپلود زیر 150 کیلوبایت باشد
        </p>
      </div>
      <div className="slides-section" ref={scrollRef}>
        <DragDropContext onDragEnd={handleDragEnd}>
          {sliderState.map((item, index) => (
            <div key={index} className="slide">
              <Droppable droppableId={`slides-${index}`} direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="slide-content"
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    <Draggable
                      key={index}
                      draggableId={index.toString()}
                      index={index}
                      isDragDisabled={item.isPlaceholder}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <SpecialItem
                            slide={item}
                            index={index}
                            setSlider={handleSlideChange}
                            uploading={item?.file}
                          />
                        </div>
                      )}
                    </Draggable>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </div>
      <button
        onClick={settingSliders}
        className="submitBtn m-3"
        disabled={loading}
      >
        ذخیره اسلایدر ویژه
      </button>
    </SpecialListStyle>
  );
};

export default SpecialList;
