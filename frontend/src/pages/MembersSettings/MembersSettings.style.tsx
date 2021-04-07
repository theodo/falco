import Select from 'components/Select/Select';
import styled from 'styled-components';
import {
  colorUsage,
  fontFamily,
  fontSize,
  fontWeight,
  getSpacing,
  lineHeight,
  settingsContainerSize,
} from 'stylesheet';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 ${getSpacing(4)} 0;
  margin: 0;
  width: ${settingsContainerSize};
`;
export const PageTitle = styled.h1`
  line-height: ${lineHeight.h1Text};
  color: ${colorUsage.h1Text};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.h1Text};
  font-weight: ${fontWeight.h1Text};
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PageSubTitle = styled.h3`
  line-height: ${lineHeight.h3Text};
  color: ${colorUsage.h3Text};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.h3Text};
  font-weight: ${fontWeight.h3Text};
  margin-top: ${getSpacing(4)};
`;
export const ProjectSettingsBlock = styled.div`
  border: solid 1px ${colorUsage.projectSettingsContainerBorder};
  margin-top: ${getSpacing(4)};
  border-radius: 3px;
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.inputText};
  line-height: ${lineHeight.inputText};
  color: ${colorUsage.inputText};
`;
export const ElementContainer = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;

  :first-child {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom: solid 1px ${colorUsage.projectSettingsContainerBorder};
    background-color: ${colorUsage.oddProjectMemberBackground};
    font-weight: bold;
  }

  :last-child {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  /* stylelint-disable selector-max-specificity */
  :nth-child(odd) {
    background-color: ${colorUsage.oddProjectMemberBackground};
  }
  /* stylelint-enable */
`;
export const SelectUser = styled(Select)`
  margin-top: ${getSpacing(4)};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.inputSelectText};
  line-height: ${lineHeight.inputSelectText};
`;
export const InviteUserLink = styled.span`
  margin-top: ${getSpacing(4)};
  line-height: ${lineHeight.bodyText};
  color: ${colorUsage.bodyText};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.bodyText};
  font-weight: ${fontWeight.bodyText};
`;
export const MemberUsername = styled.span`
  width: 25%;
`;
export const MemberEmail = styled.span`
  width: 30%;
`;
export const MemberAdminBadgeContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
`;
export const MemberAdminDeleteContainer = styled.div`
  width: 5%;
  display: flex;
  flex-direction: row-reverse;
`;
export const MemberAdminDeleteButton = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  padding: 2px;
  background: inherit;

  &:hover {
    opacity: 0.5;
    background: white;
    transition-duration: 0.2s;
  }
`;
