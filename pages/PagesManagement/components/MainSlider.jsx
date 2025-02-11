import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { showError } from "utilize/toast";
import { MainSliderStyle, OrderBoxSlider } from "../styles";
import { Add } from "@styled-icons/remix-fill/Add";
import getSlider from "services/sliderServices/getSlider";
import postSlider from "services/sliderServices/postSlider";
import SliderItem from "components/page customize/SliderItem";
import deleteSlider from "services/sliderServices/deleteSlider";
import { Drag } from "@styled-icons/fluentui-system-filled/Drag";

const MainSlider = (props) => {
  const [sliderState, setSliderState] = useState([]);
  const sliderRef = useRef(null);

  const dragEndHandler = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (source.index === destination.index) {
      return;
    }

    let _slides = [...sliderState];
    const _draggedProduct = _slides[source.index];
    _slides.splice(source.index, 1);
    _slides.splice(destination.index, 0, _draggedProduct);
    setSliderState(_slides);
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    filter: isDragging
      ? "drop-shadow(0 0 10px #3e8bff)"
      : "drop-shadow(0 0 5px gray)",
    ...draggableStyle,
  });

  const sliderOption = {
    customPaging: function (i) {
      return (
        <a>
          <div>
            {i === 0 ? <Add style={{ width: "20px", height: "20px" }} /> : i}
          </div>
        </a>
      );
    },
    dotsClass: "numberBox",
    speed: 700,
    rtl: false,
    slidesToShow: 1,
    dots: true,
    slidesToScroll: 1,
    infinite: false,
    lazyLoad: false,
    initialSlide: 1,
  };

  useEffect(() => {
    (async () => {
      const sliderData = await getSlider(props.menuId);

      setSliderState(sliderData);
    })();
  }, [props.menuId]);

  const submitHandler = async () => {
    const _slider = sliderState.filter((slide) => slide && slide);
    _slider.forEach((item, index) => {
      if (!item.liveId && item.live && item.live.id) item.liveId = item.live.id;
      item.productId = item.productId;
      item.order = index + 1;
      item.sort = index + 1;

      if (props.menuId) item.menuIdList = [props.menuId];
      // item.id = index + 1;
      if (item.product) {
        item.productId = item.product?.id;
      }
      delete item.product;
    });

    if (_slider.length >= 1) {
      await postSlider(props.menuId, JSON.stringify(_slider));
    }

    if (props.isLivePage && _slider.length === 0) {
      await deleteSlider(props.menuId);
    }

    if (_slider.length === 0 && !props.isLivePage) {
      showError("حداقل یک اسلاید برای اسلایدر اصلی بسازید");
    }
  };

  return (
    <MainSliderStyle>
      <div className="sliderContainer d-flex flex-wrap">
        <Slider className="sliderHolder" {...sliderOption} ref={sliderRef}>
          <SliderItem
            slider={sliderState}
            setSlider={setSliderState}
            isLivePage={props.isLivePage}
            sliderRef={sliderRef}
          />
          {sliderState &&
            sliderState.map((item, index) => (
              <div className="d-flex justify-content-between">
                <SliderItem
                  slide={item}
                  slider={sliderState}
                  setSlider={setSliderState}
                  isLivePage={props.isLivePage}
                  index={index}
                  key={`${index}-desktop`}
                  bannerType="desktop"
                />
                <SliderItem
                  slide={item}
                  slider={sliderState}
                  setSlider={setSliderState}
                  isLivePage={props.isLivePage}
                  index={index}
                  key={`${index}-mobile`}
                  bannerType="mobile"
                />
              </div>
            ))}
        </Slider>
        <div className="col px-2">
          <div>
            <h5>ترتیب اسلایدر</h5>
            <DragDropContext onDragEnd={dragEndHandler}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    className="sliderOrder"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {sliderState &&
                      sliderState.map((item, index) => (
                        <Draggable
                          key={item.imageHorizontalPath}
                          draggableId={item.imageHorizontalPath}
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
                              className="orderBoxWrapper"
                            >
                              <OrderBoxSlider
                                previewHorizontalRatio={2}
                                previewVerticalRatio={1}
                              >
                                {item.imageHorizontalPath.endsWith(".mp4") ? (
                                  <video playsInline autoPlay loop muted>
                                    <source
                                      type="video/mp4"
                                      src={
                                        process.env.REACT_APP_API_URL_FILE +
                                        item.imageHorizontalPath
                                      }
                                    />
                                  </video>
                                ) : (
                                  <img
                                    src={
                                      process.env.REACT_APP_API_URL_FILE +
                                      item.imageHorizontalPath
                                    }
                                    alt="nobino"
                                  />
                                )}
                                <div
                                  {...provided.dragHandleProps}
                                  className="dragHolder"
                                >
                                  <Drag />
                                </div>
                              </OrderBoxSlider>
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
        </div>
      </div>
      <button onClick={submitHandler} className="submitBtn mb-3">
        ذخیره اسلایدر اصلی
      </button>
    </MainSliderStyle>
  );
};

export default MainSlider;
