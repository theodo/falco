import Button from 'components/Button';
import styled from 'styled-components';
import {
  colorUsage,
  fontFamily,
  fontSize,
  getSpacing,
  inheritVar,
  lineHeight
} from 'stylesheet';

interface AddInputProps {
  isAdding: boolean;
}

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

export const NameHeader = styled.span`
  ${genericStyle}
  width: 25%;
`;

export const Script = styled.span`
  white-space: nowrap;
  width: 70%;
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.inputText};
  line-height: ${lineHeight.inputText};
  color: ${colorUsage.inputText};
  margin-right: ${getSpacing(4)};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const EditIconContainer = styled(Button)`
  width: ${inheritVar};
  height: ${inheritVar};
  margin: unset;
`;

export const NameScript = styled.div`
  ${genericStyle}
  width: 25%;
`;

export const ScriptHeader = styled.div`
  ${genericStyle}
  width: 70%;
`;

export const AddScriptButtonContainer = styled(Button)`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-grow: 1;
  font-size: ${inheritVar};
  font-family: ${inheritVar};
  color: ${inheritVar};

  &:hover {
    opacity: 0.5;
    background: white;
    transition-duration: 0.2s;
  }
`;

export const AddScriptButtonLabel = styled.div`
  margin-left: ${getSpacing(4)};
`;
export const ScriptDeleteContainer = styled.div`
  width: 5%;
  display: flex;
  flex-direction: row-reverse;
`;

export const ScriptDeleteButton = styled.button`
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
