import Button from "components/Button";
import styled from 'styled-components';
import {
  colorUsage,
  fontFamily,
  fontSize,
  fontWeight,
  getSpacing,
  inheritVar,
  lineHeight
} from 'stylesheet';

interface ItemWithMarginProps {
  margin?: string;
}

interface AccountMenuContainerProps {
  position?: string;
  right?: string | null;
}

export const Container = styled.div`
    width: 460px;
    background-color: ${colorUsage.accountMenuBackground};
    box-shadow: 0 0 8px 4px ${colorUsage.accountMenuShadow};
    position: ${(props: AccountMenuContainerProps) => (props.position ? props.position : 'static')};
    right: ${(props: AccountMenuContainerProps) => (props.right ? props.right : 'auto')};
    color: ${colorUsage.accountMenuText};
    font-family: ${fontFamily.mainSans};
  `;

export const UserInfosBlockContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 ${getSpacing(10)};
  `;

export const UserInfosBlock = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${getSpacing(4)} 0;
    border-bottom: 1px solid ${colorUsage.accountMenuUserInfosBlockBorder};
  `;
export const UserName = styled.div`
    font-size: ${fontSize.h3Text};
    font-weight: ${fontWeight.h3Text};
    line-height: ${lineHeight.h3Text};
  `;
export const UserEmail = styled.div`
    font-size: ${fontSize.bodyText};
    line-height: ${lineHeight.bodyText};
  `;

export const UserActionsBlock = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${getSpacing(2)} 0;
  `;

export const UserActionItem = styled.div`
    margin: ${(props: ItemWithMarginProps) =>
    props.margin ? props.margin : `0 0 ${getSpacing(3)} 0`};
    padding: ${getSpacing(2)} ${getSpacing(10)};
    cursor: pointer;
    font-size: ${fontSize.introductionText};
    line-height: ${lineHeight.introductionText};
    color: ${colorUsage.introductionText};

    &:hover {
      color: ${colorUsage.accountMenuActionItemHoverText};
      font-weight: ${fontWeight.accountMenuActionItemHoverText};
    }
  `;

  export const UserActionItemExternalLink = styled.a`
    all: unset;

    &:focus {
      outline: -webkit-focus-ring-color auto 5px;
    }
  `

export const UserActionItemButton = styled(Button)`
  color: ${inheritVar};
  font: ${inheritVar};
  `;
