import styled from "styled-components";

export const CreateAdCustomersStyles = styled.div`
  padding: 32px 24px;

  h2 {
    color: #000;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 30px;
  }

  form {
    display: flex;
    flex-wrap: wrap;
  }

  input,
  textarea {
    border: 1px solid #c3d6ff;
    border-radius: 8px;
  }

  label {
    width: 100%;
    size: 18px;
    font-weight: 400;
    padding-bottom: 10px;
  }

  div {
    width: 50%;
    padding: 0 10px;
    margin-bottom: 30px;

    > * {
      width: 100%;
    }

    span {
      display: flex;
      justify-content: end;
      color: #00000080;
      font-size: 15px;
      text-align: end;
    }
  }

  .addressWrapper {
    width: 100%;
  }

  button {
    width: 190px;
    height: 48px;
    background-color: transparent;
    border-radius: 8px;
    margin-right: 10px;
    font-weight: 400;
  }

  button:disabled {
    opacity: 0.3;
  }

  .submitButton {
    border: 1px solid #629635;
    color: #629635;
    &:hover {
      background-color: #629635;
      border: 1px solid #629635;
    }
  }

  .Submit-enable {
    background-color: #629635;
    color: #ffffff;
  }

  .Submit-disable {
    color: #629635;
  }

  .cancelButton {
    border: 1px solid #c30000;
    color: #c30000;
    &:hover {
      background-color: #c30000;
      border: 1px solid #c30000;
    }
  }

  .input-error {
    border: 1px solid #c30000;
  }

  .input-mobile {
    direction: ltr;
  }

  .input-mobile::placeholder {
    text-align: right;
  }

  .description-error {
    padding-top: 5px;
    color: #c30000;
  }
  .p-inputtext {
    min-height: 50px;
  }
`;
