import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, getSpacing } from 'stylesheet';

const Style = {
  Container: styled.div`
    border: 3px solid ${colorUsage.tileContainer};
    border-radius: ${getSpacing(2)};
    width: 330px;
    margin-bottom: ${getSpacing(6)};
  `,
  ProjectScreenshot: styled.img`
    width: 100%;
  `,
  ProjectTitle: styled.h2`
    color: ${colorUsage.tileTitle};
    text-align: center;
    font-size: ${fontSize.large};
    margin: ${getSpacing(2)} auto;
  `,
  LastAudit: styled.p`
    color: ${colorUsage.tileLastAudit};
    font-size: ${fontSize.medium};
    text-align: center;
    font-family: ${fontFamily.mainMono};
    margin: 0 auto ${getSpacing(2)};
  `,
  PagesWrapper: styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  `,
  Page: styled.h4`
    color: ${colorUsage.tilePageTitle};
    font-size: ${fontSize.medium};
    margin-bottom: 0;
    margin-top: ${getSpacing(1)};
    flex-basis: 40%;
    text-align: left;
    padding-left: ${getSpacing(4)};
    font-family: ${fontFamily.mainMono};
  `,
  LinkWrapper: styled.div`
    text-align: center;
    margin: ${getSpacing(4)} auto;
  `,
  PrimaryButton: styled.button`
    cursor: pointer;
    border-radius: ${getSpacing(1)};
    height: 50px;
    background: ${colorUsage.tileButtonBackground};
    color: ${colorUsage.tileButtonText};
    font-size: ${fontSize.medium};
    font-family: ${fontFamily.mainSans};
    font-weight: 700;
    padding: 0 ${getSpacing(4)};
  `,
};

export default Style;
