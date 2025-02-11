import styled from "styled-components";

export const AdsListStyles = styled.div`
  padding: 32px 24px;

  h1 {
    color: #000;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 30px;
  }

  .row-buttons {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;

    button {
      width: 38px;
      height: 38px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .badge {
    margin: auto;
  }

  .create-ad {
    margin-bottom: 20px;
  }
`;
