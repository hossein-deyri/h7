import styled from "styled-components";

export const CreateAdStyles = styled.div`
  padding: 32px 24px;

  h1 {
    color: #000;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 24px;
  }

  .action-buttons {
    display: flex;
    gap: 16px;
    margin-top: 24px;

    button {
      width: 190px;
      border-radius: 8px;
    }
  }

  .form-flex {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;

    .form-col {
      flex: 1 1 250px;

      > div,
      > span {
        min-height: 50px;
        border-radius: 8px;
      }

      input {
        min-height: 50px;
        border: 1px solid #c3d6ff;
        border-radius: 8px;
      }

      .p-multiselect-chip {
        border: 1px solid #c3d6ff;
      }
    }
  }

  .error-message {
    color: #e21221;
    font-size: 14px;
  }
`;
