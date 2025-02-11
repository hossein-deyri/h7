import { Tabs } from "react-bootstrap";
import styled from "styled-components";

export const SubscriptionTypeTabStyles = styled(Tabs)`
  border: 1px solid #e21622;
  border-radius: 100px;

  .nav-link {
    color: #e21622;
    min-width: 100px;
  }

  .nav-link.active {
    color: #c30000;
    background-color: #e2162233;
  }

  .nav-item:first-child .nav-link {
    border-radius: 0 20px 20px 0;

    &.active {
      border-left: 1px solid #e21622;
    }
  }

  .nav-item:last-child .nav-link {
    border-radius: 20px 0 0 20px;

    &.active {
      border-right: 1px solid #e21622;
    }
  }
`;
