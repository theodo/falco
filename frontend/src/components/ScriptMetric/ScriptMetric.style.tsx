import styled from 'styled-components';

const Style = {
  Container: styled.div`
    margin: 10px 0;
    width: 100%;
  `,
  Title: styled.div`
    background-color: #9ba3c9;
    padding: 7px 20px;
    border-radius: ${({ isExpanded }: { isExpanded: boolean }) =>
      isExpanded ? '5px 5px 0 0' : '5px'};
    color: white;
    display: flex;
    align-items: center;
    position: relative;
  `,
  TitleExpander: styled.div`
    position: absolute;
    right: 5px;
    top: 7px;
    cursor: pointer;
  `,
  PageLink: styled.a`
    color: white;
    margin-left: 5px;
    display: flex;
  `,
};

export default Style;
