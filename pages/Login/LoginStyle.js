import styled from "styled-components";

export const LoginStyle = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .infoBoxLogin {
    img {
      margin-right: 15px;
      position: absolute;
      top: 15px;
      right: 15px;
    }
    p {
      font-size: 20px;
      font-weight: 500;
    }
  }

  .loginBox {
    width: 450px;
    padding: 3rem 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #232328;
    border-radius: 20px;
    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.3);

    .logo {
      width: 130px;
      margin-bottom: 3rem;
    }

    .form-wrapper {
      width: 100%;

      .inputBox {
        color: white;
        font-size: 14px;

        label {
          display: inline-block;
          width: 150px;
          white-space: nowrap;
          margin-bottom: 8px;
        }

        input {
          color: #fff;
          background-color: #fff1;
          border-color: #fff1;
          padding: 0.5rem 0.75rem;
          direction: ltr;

          &.error-input {
            border-color: #d32f2f;
          }

          &::placeholder {
            color: #fff8;
            text-align: right;
            font-size: 12px;
          }
        }

        .error {
          color: #d32f2f;
          font-size: 13px;
          margin-top: 4px;
        }
      }
    }

    .submit-button {
      width: 100%;
      margin-top: 1.5rem;

      .p-button-icon {
        margin-right: unset;
        margin-left: 0.5rem;
      }
    }
  }
`;
