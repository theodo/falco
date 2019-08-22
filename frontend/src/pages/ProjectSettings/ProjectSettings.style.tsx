import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

const Style = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
  `,

  PageTitle: styled.div`
    line-height: ${lineHeight.h1Text};
    color: ${colorUsage.h1Text};
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.h1Text};
    font-weight: ${fontWeight.h1Text};
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

Title: styled.div`
  line-height: ${lineHeight.h2Text};
  color: ${colorUsage.h2Text};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.h2Text};
  font-weight: ${fontWeight.h2Text};
  margin-bottom: ${getSpacing(6)};
  margin-top: ${getSpacing(4)};
`,

PageSubTitle: styled.div`
  line-height: ${lineHeight.h3Text};
  color: ${colorUsage.h3Text};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.h3Text};
  font-weight: ${fontWeight.h3Text};
`,

ProjectMembersBlock: styled.div`
  border: solid 1px ${colorUsage.projectMembersContainerBorder};
  margin: ${getSpacing(4)} 0;
  border-radius: 3px;
  min-height: 200px;
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.inputText};
  line-height: ${lineHeight.inputText};
  color: ${colorUsage.inputText};
`,

ProjectMemberContainer: styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;

  :nth-child(odd){
    background-color: ${colorUsage.oddProjectMemberBackground};
  }
`,

MemberUsername: styled.div`
  width: 25%
`,

MemberEmail: styled.div`
  width: 50%
`,

MemberAdminBadgeContainer: styled.div`
  width: 20%
`,

MemberAdminCloseContainer: styled.div`
  width: 5%
`,
};


export default Style;
