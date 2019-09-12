import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, getSpacing, lineHeight } from 'stylesheet';

const genericStyle = `
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.inputText};
  line-height: ${lineHeight.inputText};
  color: ${colorUsage.inputText};
  background-color: inherit;
  margin-right: ${getSpacing(4)};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const editableInputStyle = `
  ${genericStyle}
  height: 90%;

  :hover:not(:disabled):not(:focus) {
    opacity: 0.5;
  }

  :focus {
    border: solid 1px ${colorUsage.editableRowInputBorder};
    box-shadow: 0 2px 2px 0 ${colorUsage.editableRowInputBorder};
    border-radius: 3px;
    background-color: white;
  }
`;

export const NameHeader = styled.div`
  ${genericStyle}
  width: 25%;
`;

export const UrlHeader = styled.div`
  ${genericStyle}
  width: 70%;
`;

export const NameInput = styled.input`
  ${editableInputStyle}
  width: 25%;
`;

export const UrlInput = styled.input`
  ${editableInputStyle}
  width: 70%;
`;

export const EditButtonContainer = styled.div`
  width: 5%;
  display: flex;
  flex-direction: row-reverse;
`;

export const EditButton = styled.button`
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
