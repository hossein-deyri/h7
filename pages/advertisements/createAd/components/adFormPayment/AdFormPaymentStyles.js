import styled from "styled-components";

export const AdFormPaymentStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  h2 {
    font-size: 24px;
    font-weight: 600;
    padding-top: 30px;
  }

  label {
    width: 100%;
    size: 18px;
    font-weight: 400;
    padding-bottom: 10px;
    padding-top: 15px;
  }

  input {
    min-width: 530px;
    min-height: 50px;
    border-radius: 8px;
    padding-left: 50px;
    direction: ltr;
    border: 1px solid #c3d6ff;
  }

  span {
    position: relative !important;
  }

  .currency-unit {
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 50px;
    color: #495057;
    font-size: 15px;
    font-weight: 400;
  }
`;
