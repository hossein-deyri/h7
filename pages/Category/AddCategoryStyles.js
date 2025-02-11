import styled from "styled-components";

export const AddCategoryStyles = styled.div`
  background: white;
  padding: 40px;
  border-bottom: 1px solid #919baa;
  .backgroundImage {
    height: 150px;
  }
  .imageHolder {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 20px;
    margin-top: 40px;
    // >div{
    //     width:50%;
    //     padding:25px;
    // }
    .smallImages {
      height: 150px;
    }
    .smallWidth {
      width: 200px;
    }
    .bigWidth {
      width: 500px;
    }
  }
  .container-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;
