import styled from "styled-components";

export const Content = styled.div`
  border: 1px solid transparent;
  border-radius: 10px;

  /* TODO: @ali: pull out this to a new common component */
  .p-chip {
    margin-right: 10px;
    border: 1px solid;

    &.success {
      border-color: #2a8100;
      background-color: #50b61e33;
      color: #2a8100;
    }

    &.error {
      border-color: #c30000;
      background-color: #ed2e2e33;
      color: #c30000;
    }

    &.info {
      border-color: #05478a;
      background-color: #3e8bff33;
      color: #05478a;
    }

    &.warning {
      border-color: #e87f00;
      background-color: #ff8c0033;
      color: #e87f00;
    }

    &.text,
    &.secondary {
      border-color: #495057;
      background-color: #dee2e6;
      color: #495057;
    }

    .p-chip-text {
      font-size: 13px;
    }
  }

  .filmIconHolder {
    color: #e21221;
    margin-left: 10px;
    margin-right: 10px;
    svg {
      width: 24px;
      height: 22px;
    }
  }

  .fixedTagHolder {
    display: flex;
    flex-wrap: wrap;
    > div {
      display: flex;
      align-items: center;
      justify-content: start;
      flex-wrap: wrap;
    }
    .tagHolder {
      width: auto;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      /* border: 1px solid #111; */
      margin: 5px;
      border-radius: 10px;
      label {
        cursor: pointer;
      }
    }
  }

  .p-inputswitch {
    height: 28px;
    width: 60px;

    .p-inputswitch-slider {
      background: #f3f5f8;

      &::before {
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        background: white;
        width: 24px;
        height: 24px;
        top: 43%;
      }
    }
  }

  .p-inputswitch-checked {
    .p-inputswitch-slider {
      background: #3e8bff;

      &::before {
        transform: translateX(1.85rem);
      }
    }
  }

  .status {
    font-size: 14px;
    color: #111;
  }

  .redText {
    color: #e21221;
  }

  .selectedBox {
    background: #3e8bff;
    color: white;
  }

  .darkBtn {
    font-size: 14px;
    color: white;
    background: #111;
    border: none;
    outline: none;
    padding: 10px 45px;
    border-radius: 5px;
    display: flex;
    align-content: center;
    justify-content: center;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }

  .blueBtn {
    background: #3e8bff;
    border-radius: 5px;
    font-size: 14px;
    color: white;
    border: none;
    outline: none;
    transition: 0.3s;

    &:hover {
      opacity: 0.9;
    }
  }

  .saveBtn {
    font-size: 14px;
    color: white;
    border: none;
    outline: none;
    border-radius: 5px;
    background-color: #e21221;
    padding: 10px 22px;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;

    &:hover {
      opacity: 0.9;
    }
    svg {
      width: 20px;
      height: 20px;
    }
  }

  .form-control,
  .form-select,
  .light-blue-bg {
    background: #f3f5f8;
  }

  .mobileImage {
    width: 30%;
  }

  .uploadField {
    border: 1px dashed #46647d;
    border-radius: 10px;
    overflow: hidden;
  }

  .uploadCloudIcon {
    box-shadow: 0 0 20px 0 rgba(70, 100, 125, 0.1);
    border-radius: 10px;
  }

  .screenshotBox {
    border-radius: 10px;
    overflow: hidden;
    user-select: none;
    cursor: pointer;

    .close {
      color: white;
      width: 20px;
      height: 20px;
      top: 5px;
      right: 5px;
      border: none;
      outline: none;
      background: #e21221;
      border-radius: 50%;
      svg {
        width: 18px;
        height: 18px;
      }
    }
    .screenshotActive {
      position: relative;
      .blueBg {
        background: #3e8bff;
        opacity: 0.75;
        width: 100%;
        height: 100%;
      }
      .greenBg {
        background: green;
        opacity: 0.75;
        width: 100%;
        height: 100%;
      }
      svg {
        color: white;
        width: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
  .content-text {
    .right {
      .form-select {
        background-position: left 0.75rem center !important;
        /* padding: 0.375rem 2rem 0.375rem 0.75rem !important; */
      }
      .product-type {
      }
    }
  }

  .mainTitle {
    font-size: 16px;
    color: #46647d;
    font-weight: bold;
  }

  .navbar li {
    margin-right: 7px;
    font-size: 14px;
    font-weight: 500;
  }

  .movie-time {
    input:focus {
      outline: 0;
    }
  }

  .screenshots {
    .right {
      .upload-video {
        .quality:hover {
          color: red;
        }
      }
    }
    .left {
      .gallery {
        width: 100%;
        height: 250px;
        overflow-y: scroll;
        background-color: #f3f5f8;
        direction: ltr;

        .images {
          button {
            :hover {
              background-color: red;
            }
          }
        }
      }
    }
  }
  .display-none {
    display: none;
  }
  .tabNotActive {
    .p-tabmenuitem:not(:nth-of-type(1)) {
      a {
        color: #c0c5cc;
      }
      pointer-events: none;
    }
  }
  .form-select {
    background: none !important;
  }
`;
