import styled from 'styled-components';
import { colorUsage, getSpacing } from 'stylesheet';

const StyledMenu = {
  Menu: styled.div`
    position: fixed;
    top: 100px;
    z-index: 10;
    background-color: ${colorUsage.menuBackground};
    padding-left: ${getSpacing(22)};
    width: 380px;
    height: 100%;
  `,
};

export default StyledMenu;
