import styled from "styled-components";

export const UsersDetailsStyles = styled.div`
  padding: 30px 23px;

  h1 {
    font-weight: 600;
    font-size: 20px;
  }

  h2 {
    font-weight: 600;
    font-size: 16px;
  }

  .list-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 32px;
  }

  .tab-content {
    width: 100%;

    .p-datatable-wrapper {
      overflow: auto;
    }
  }
`;
