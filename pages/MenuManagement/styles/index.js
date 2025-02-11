import styled from "styled-components";
export const MenuStyle = styled.div`
  .form-control {
    border-radius: 5px;
    border: none;
  }
  padding: 73px 25px;
  .mainTitle {
    font-size: 16px;
    color: #46647d;
    font-weight: bold;
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
  .custom-margin {
    margin-bottom: 35px;
  }
  .divider {
    height: 1px;
    background-color: #e6ebf0;
  }
  .menu-box {
    width: 300px;
  }
  .menu-item-divider {
    width: 1px;
    background-color: #919baa;
    height: 80%;
    position: absolute;
    left: 2rem;
    top: 3px;
  }
  .menu-wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    .menuHolder {
      display: flex !important;
      justify-content: start;
      min-width: 300px;
      max-width: 300px;
      span {
        text-align: center;
        display: flex;
        align-items: center;
      }
    }
  }
  .creationHolder {
    // margin: 10px;
    // padding: 10px;
    margin-top: 23px;
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background:rgb(245, 245, 245); */
    .disabled {
      opacity: 0.45;
      pointer-events: none;
    }

    .field-radiobutton {
      display: flex;
      align-items: center;
      label {
        padding: 0 1rem;
        cursor: pointer;
      }

      &:first-child {
        margin-left: 102px;
      }
    }
    > div {
      display: flex;
      align-items: center;
      justify-content: start;
      width: 100%;
    }
    > div > div {
      display: flex;
      align-items: center;
      /* width:100%; */
      margin-bottom: 15px;
      span {
        display: block;
        font-size: 14px;
        white-space: nowrap;
        margin-left: 10px;
      }
    }
    input {
      background-color: #f3f5f8;
      ::placeholder {
        color: #919baa;
        font-size: 14px;
      }
    }
    /* .titleHolder{
        input{
            width:50%;
        }
    } */
  }

  .menuHolder {
    border: 1px solid #46647d;
    border-radius: 10px;
    background: white;
    width: fit-content;
    padding: 0.2rem 0.5rem;
    margin: 0.5rem;
    position: relative;

    .closeHolder {
      position: absolute;
      left: 2.25rem;
      svg {
        width: 20px;
        height: 20px;
      }
      color: #e21221;
      top: 50%;
      cursor: pointer;
      transform: translateY(-50%);
    }
    .editHolder {
      position: absolute;
      left: 4.25rem;
      svg {
        width: 20px;
        height: 20px;
      }
      color: #3a8052;
      top: 50%;
      cursor: pointer;
      transform: translateY(-50%);
    }
  }
  .dragHolder {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #919baa;
    border-radius: 10px;
    padding: 5px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: move;
    left: 2px;

    svg {
      color: white;
      width: 15px;
      height: 15px;
    }
  }
  .menuPreview {
    height: 50px;
    width: 100%;
    overflow-x: scroll;
  }
  .submitBtn {
    width: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
  .disable-button {
    opacity: 0.5;
  }
`;
