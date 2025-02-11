import styled from "styled-components";

export const ContentIndexStyle = styled.div`
  background: #e6ebf0;
  min-height: 100vh;
  height: fit-content;
  .fullHeight {
    min-height: calc(100vh - 72px);
  }

  .posSticky {
    position: sticky;
    top: 0;
    right: 0;
  }
  .content {
    width: calc(100% - 210px);
    > div {
      border-radius: 10px;
      background: white;
    }
  }
  .navSide {
    align-self: stretch;
    z-index: 1;
  }

  .card {
    border: none;
  }

  .p-panelmenu .p-panelmenu-header > a {
    border: none;
  }

  .p-panelmenu-header-link {
    display: flex;
    align-items: center;
    width: 100%;
    border: 1px solid red;
    justify-content: space-between;

    .p-icon {
      order: 2;
    }
  }

  .dashboardBtn {
    display: none;
    border: none;
    outline: none;
    width: 80%;
    margin: 10px auto;
    padding: 5px;
    background: #46647d;
    color: white;
    box-shadow: 2px 2px 5px #46647d;
    transition: 0.3s;
    &:active {
      box-shadow: none;
    }
  }

  .header {
    box-shadow: 0 3px 6px 0 #d9dee3;
    z-index: 2;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    h2 {
      font-size: 20px;
      font-weight: bold;
      margin: 0 10px;
    }
    .logoutHolder {
      width: 20px;
      color: #e21221;
      cursor: pointer;
      transition: 0.3s;
      transform: scale(1) translateY(0);
      filter: none;
      :hover {
        filter: drop-shadow(0px 0px 10px red);
        transform: scale(1.1) translateY(-3px);
      }
    }
  }

  .container {
    min-height: 80vh;
  }

  .navSide {
    background: #fff;
    width: 210px;
    margin-top: 1rem !important;
    border-radius: 10px;
  }
  .p-component {
    font-size: 14px !important;
  }
  .p-panelmenu .p-menuitem-text {
    color: #919baa !important;
  }

  .p-panelmenu .p-panelmenu-header > a {
    background: #fff !important;
  }

  .p-panelmenu .p-highlight > a {
    background: #f5f5f5 !important;
  }

  .p-panelmenu .p-panelmenu-header > a:focus,
  a:focus {
    box-shadow: none;
  }

  .p-panelmenu .p-panelmenu-content .p-menuitem .p-menuitem-link:focus {
    box-shadow: none;
  }
  .p-paginator .p-dropdown .p-dropdown-label {
    padding: 5px 10px;
  }
  .p-button-icon {
    margin-top: 5px;
  }

  .p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link {
    border-color: #e21221;
    color: #e21221;
  }
  .p-tabmenu
    .p-tabmenu-nav
    .p-tabmenuitem
    .p-menuitem-link:not(.p-disabled):focus {
    box-shadow: none;
  }
  .p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link .p-menuitem-icon {
    margin-right: 0;
    margin-left: 8px;
    margin-top: 8px;
  }
  .p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
    padding: 8px 6.5px;
  }
  .p-menuitem-text {
    font-weight: 500;
  }

  .p-panelmenu
    .p-panelmenu-content
    .p-menuitem
    .p-menuitem-link
    .p-menuitem-icon {
    margin-left: 8px;
    margin-top: 8px;
  }
`;
