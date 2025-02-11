import styled from "styled-components";

export const SpecialListStyle = styled.div`
  .description-color {
    padding: 5px 0;
  }

  .slides-section {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
  }
`;

export const MainSliderStyle = styled.div`
  border-bottom: 1px solid #919baa;
  position: relative;
  .slick-list {
    height: 550px;
  }
  .numberBox {
    display: flex !important;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    direction: rtl;
    flex-wrap: wrap;
    width: fit-content;
    margin-left: auto;

    > li {
      width: 40px;
      height: 40px;
      border-radius: 5px;
      border: 1px solid #3e8bff;
      color: #46647d;
      font-size: 14px;
      margin: 5px;
      cursor: pointer;
      text-align: center;
      vertical-align: 1.5;
      &:nth-of-type(1) {
        margin-right: 0;
      }
      > a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
      &.slick-active {
        color: white;
        background-color: #3e8bff;
      }
    }
  }
  .sliderOrder {
    height: 50vh;
    overflow-y: auto;
    align-self: stretch;
    border: 1px solid #3e8bff;
    border-radius: 10px;
    padding: 10px;
  }
  .sliderHolder {
    width: 70%;
  }
  .dragHolder {
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 10px;
    padding: 5px;
    position: absolute;
    top: 20%;
    transform: translateY(-50%);
    cursor: move;
    right: 10px;
    svg {
      color: #3e8bff;
      width: 20px;
      height: 20px;
    }
  }
  .orderBoxWrapper {
    display: flex;
    justify-content: center;
  }
`;

export const OrderBoxSlider = styled.div`
  width: ${({ previewHorizontalRatio, previewVerticalRatio }) =>
    ((previewVerticalRatio / previewHorizontalRatio) * 100).toFixed(2)}%;
  margin: 0.5rem 0;
  position: relative;
  filter: drop-shadow(0 0 5px black);
  img {
    width: 100%;
    user-select: none;
    object-fit: contain;
  }
  video {
    width: 100%;
  }
`;
export const CarouselContainerStyle = styled.div`
  background: #c8c8c8;
  border: 1px solid #e6ebf0;
  border-radius: 5px;
`;

export const MainPageCustomizeStyle = styled.div`
  padding: 2%;
  .pageTitle {
    color: #919baa;
    font-size: 16px;
    margin-bottom: 16px;
    display: block;
  }
  .sectionTitle {
    display: block;
    font-size: 20px;
    color: #111;
    margin-bottom: 10px;
    font-weight: bold;
  }
`;
