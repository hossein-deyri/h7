import styled from "styled-components"

export const AddPersonStyle = styled.div`
    padding:15px;


    .title{
    display:flex;
    align-items: center;
    color: #e21221;
    svg {
        margin-left: 5px;
        width: 24px;
        height: 22px;
    }
        h4{
            margin:0;
            font-size:16px;
            color: #46647d;
            font-weight: bold;
        }
    }

    .inputBox{
        display:flex;
        justify-content: center;
        align-items: center;
        &:not(:first-child){
            margin-top: 20px;
        }
        span{
            display:block;
            width:20%;
            white-space: nowrap;
        }
        
    }

    .right{
        margin-top: 25px;
        border-left:1px solid red;
        padding-left: 15px;
    }

    .saveBtn{
        background:#e21221;
        color: white;
        border: none;
        outline: none;
        width: fit-content;
        padding: 8px 15px;
        border-radius: 5px;
        margin: 20px auto;
    }


`;