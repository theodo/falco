import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

interface ItemWithMarginProps {
  margin?: string;
}

interface AccountMenuContainerProps {
  position?: string;
  right?: string | null;
}

const StyledAccountMenu = {
  Container: styled.div`
    width: 460px;
    background-color: ${colorUsage.accountMenuBackground};
    box-shadow: 0 0 8px 4px ${colorUsage.accountMenuShadow};
    position: ${(props: AccountMenuContainerProps) => (props.position ? props.position : 'static')};
    right: ${(props: AccountMenuContainerProps) => (props.right ? props.right : 'auto')};
    color: ${colorUsage.accountMenuText};
    font-family: ${fontFamily.mainSans};
  `,
  LoaderContainer: styled.div`
    width: 100%;
    min-height: 200px;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.color};
  `,

  UserInfosBlockContainer: styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 ${getSpacing(10)};
  `,

  UserInfosBlock: styled.div`
    display: flex;
    flex-direction: column;
    padding: ${getSpacing(4)} 0;
    border-bottom: 1px solid ${colorUsage.accountMenuUserInfosBlockBorder};
  `,
  UserName: styled.div`
    font-size: ${fontSize.h3Text};
    font-weight: ${fontWeight.h3Text};
    line-height: ${lineHeight.h3Text};
  `,
  UserEmail: styled.div`
    font-size: ${fontSize.bodyText};
    line-height: ${lineHeight.bodyText};
  `,

  UserActionsBlock: styled.div`
    display: flex;
    flex-direction: column;
    padding: ${getSpacing(2)} 0;
  `,

  UserActionItem: styled.div`
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
  `,
};

export default StyledAccountMenu;
