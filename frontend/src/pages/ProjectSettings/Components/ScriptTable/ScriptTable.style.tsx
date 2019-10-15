import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, getSpacing, lineHeight } from 'stylesheet';

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

export const NameHeader = styled.div`
  ${genericStyle}
  width: 25%;
`;

export const Script = styled.div`
  white-space: nowrap;
  width: 40%;
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.inputText};
  line-height: ${lineHeight.inputText};
  color: ${colorUsage.inputText};
  margin-right: ${getSpacing(4)};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NameScript = styled.div`
  ${genericStyle}
  width: 25%;
`;

export const ScriptHeader = styled.div`
  ${genericStyle}
  width: 40%;
`;

export const AddScriptButtonContainer = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex-grow: 1;

  &:hover {
    opacity: 0.5;
    background: white;
    transition-duration: 0.2s;
  };
`;

export const AddScriptButtonLabel = styled.div`
  margin-left: ${getSpacing(4)};
`
