import styled from "styled-components";

export const AdFormLimitsStyles = styled.div`
  h2 {
    font-weight: 600;
    font-size: 24px;
    margin: 30px 0 16px;
  }

  label {
    display: inline-block;
    padding: 24px 0 8px;

    span {
      margin-left: 8px;
    }
  }

  input,
  .p-inputwrapper {
    width: 100%;
  }

  .p-inputgroup {
    direction: ltr;
  }

  .ltr-input .p-inputnumber-input {
    text-align: left;
    direction: ltr;

    &::placeholder {
      direction: rtl;
      text-align: right;
    }
  }

  .ad-duration {
    .p-inputgroup-addon {
      background-color: transparent;
      border: 1px solid #c3d6ff;
      border-right-color: transparent;
      border-radius: 8px;
      border-bottom-right-radius: 0px;
      border-top-right-radius: 0px;
    }

    input {
      border-radius: 8px !important;
      border-bottom-left-radius: 0px !important ;
      border-top-left-radius: 0px !important;
      border-left-color: transparent !important;
    }
  }
`;
