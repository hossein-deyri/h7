import styled from "styled-components";

export const AddChannelStyle = styled.section`
  .addSection {
    background-color: #fff;
    margin: 15px auto;
    border: 1px dashed #46647d;
    color: #46647d;
    border-radius: 10px;
    cursor: pointer;
    > div {
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 14px;
        font-weight: 500;
      }
      svg {
        height: 25px;
        width: 25px;
        margin-left: 10px;
      }
    }
  }

  .channelContentSection {
    h4 {
      color: #111;
      font-size: 16px;
      font-weight: bold;
    }
  }
`;

export const ChannelSection = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 25px;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #919baa;
  }

  .createTitle {
    color: #111;
    font-size: 14px;
    font-weight: 500;
  }
  .uploadField {
    height: 110px;
    div {
      width: 110px;
      height: 110px;
    }
  }
  .blueBtn {
    padding: 10px 15px;
  }
`;
