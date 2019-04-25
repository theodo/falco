import styled from 'styled-components';
import { colorUsage, getSpacing } from 'stylesheet';

const Style = {
  Container: styled.div`
    margin: ${getSpacing(2)} 0;
    width: 100%;
  `,
  Title: styled.div`
    background-color: ${colorUsage.auditTitleBackground};
    padding: ${getSpacing(2)} ${getSpacing(4)};
    border-radius: ${({ isExpanded }: { isExpanded: boolean }) =>
      isExpanded ? getSpacing(1) + ' ' + getSpacing(1) + ' 0 0' : getSpacing(1)};
    color: ${colorUsage.auditTitleText};
    display: flex;
    align-items: center;
    position: relative;
  `,
  TitleExpander: styled.div`
    position: absolute;
    right: ${getSpacing(1)};
    top: ${getSpacing(2)};
    cursor: pointer;
  `,
  PageLink: styled.a`
    color: ${colorUsage.auditTitleText};
    margin-left: ${getSpacing(1)};
    display: flex;
  `,
};

export default Style;
