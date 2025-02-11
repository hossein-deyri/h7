import styled from "styled-components";

export const AdFormDetailsStyles = styled.div`
  h2 {
    font-weight: 600;
    font-size: 24px;
    margin: 30px 0 16px;
  }

  label {
    display: inline-block;
    padding: 24px 0 8px;
  }

  input,
  textarea,
  .p-inputwrapper {
    width: 100%;
    border: 1px solid #c3d6ff;
    border-radius: 8px;
  }

  .extra-radio-checkbox {
    margin-left: 16px;
  }

  .ltr-input {
    text-align: left;
    direction: ltr;
  }

  .p-inputtext {
    &.p-disabled {
      background-color: #898991;
    }
  }

  .p-multiselect {
    &.p-disabled {
      background-color: #898991;

      .p-multiselect-token {
        background-color: #9898a0;
        color: #404046;
      }
    }
    .p-multiselect-token {
      direction: ltr;
      background-color: #05478a;
      color: #fff;
    }
    &.p-inputwrapper-filled.p-multiselect.p-multiselect-chip
      .p-multiselect-label.p-multiselect-items-label {
      padding: 0.25rem 0.5rem;
    }
  }

  .upload-row {
    display: flex;
    gap: 50px;
    flex-wrap: wrap;

    .upload-inputs {
      flex: 1 1 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      label:first-child {
        padding: 0 0 8px;
      }

      input {
        min-height: 50px;
        border: 1px solid #c3d6ff;
        border-radius: 8px;
      }
    }

    .upload-file {
      flex: 1 1 40%;
    }
  }

  .textarea-row {
    textarea {
      resize: none;
    }
  }

  .p-inputnumber-buttons-horizontal {
    direction: ltr;

    input {
      text-align: center;
    }
  }

  .dropdown-panel {
    direction: rtl;
    width: 200px;
  }

  .dropdown-panel .p-multiselect-items .p-multiselect-item .p-checkbox {
    margin-left: 0.5rem;
  }

  .dropdown-panel .p-multiselect-header {
    flex-direction: row-reverse;
  }

  .dropdown-panel .p-multiselect-header .p-checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: fit-content;
  }

  .dropdown-panel .p-multiselect-header .p-checkbox::before {
    content: "همه";
  }

  .dropdown-panel .p-multiselect-items {
    display: flex;
    flex-wrap: wrap;
  }

  .dropdown-panel .p-multiselect-item {
    width: 50%;
  }

  .p-multiselect-items-label {
    display: flex;
    flex-wrap: wrap;
    max-height: 50px !important;
    overflow: hidden;
    .p-multiselect-token {
      margin-bottom: 20px;
    }
  }

  .p-multiselect-label-container {
    display: flex;
    align-items: center;
  }

  .ad-weight {
    > span {
      height: 50px;
    }

    .p-inputnumber {
      display: flex;
      align-items: center;
      border: 1px solid #c3d6ff;
      background-color: #ecf2ff;
      border-radius: 8px;
      padding: 8px;
    }

    .p-inputtext {
      min-height: 36px !important;
      border-radius: 8px;
      border: 1px solid #c3d6ff;
    }

    .p-inputnumber-button {
      background-color: transparent;
      border-color: transparent;
      color: #05478a;
    }

    .disable-button {
      color: #05478a36 !important;
    }
  }

  .ad-duration {
    color: #c30000;
    font-weight: 500;
    font-size: 14px;
    margin-right: 4px;
  }

  .text-line {
    text-decoration-line: line-through;
  }
`;
