import styled from 'styled-components';
import {
  colorUsage,
  fontFamily,
  fontSize,
  fontWeight,
  getSpacing,
  lineHeight,
  zIndex,
} from 'stylesheet';

export const CloseContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 975px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: ${zIndex.graphModalCloseButton};
`;

export const PageTitle = styled.div`
  line-height: ${lineHeight.h1Text};
  color: ${colorUsage.h1Text};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.h1Text};
  font-weight: ${fontWeight.h1Text};
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ScriptInput = styled.textarea`
  width: 100%;
  font-family: ${fontFamily.mainMono};
  resize: none;
  height: 70%;
  overflow-y: scroll;
  margin-top: ${getSpacing(4)};
`;

export const NameInput = styled.input`
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.inputText};
  line-height: ${lineHeight.inputText};
  color: ${colorUsage.inputText};
  margin-top: ${getSpacing(4)};
  overflow: hidden;
  text-overflow: ellipsis;
  border: solid 1px ${colorUsage.editableRowInputBorder};
  border-radius: 3px;
  background-color: ${colorUsage.createScriptButtonText};
  width: 25%;
  :focus {
    box-shadow: 0 2px 2px 0 ${colorUsage.editableRowInputBorder};
  }
`;

export const ConfirmButton = styled.button`
  margin-top: ${getSpacing(4)};
  width: 15%;
  border: none;
  padding: ${getSpacing(2)} ${getSpacing(0)};
  border-radius: 6px;
  color: ${colorUsage.createScriptButtonText};
  background-color: ${colorUsage.createScriptButtonBackground};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.createScriptButtonText};
  font-weight: bold;
  line-height: ${lineHeight.createScriptButtonText};
  cursor: pointer;
  text-decoration: none;
`;

export const Loader = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  position: fixed;
  top: 40%;
  right: 50%;
  border: 4px solid ${colorUsage.leadSubmitButtonLoaderSecondary};
  border-left-color: ${colorUsage.loader};
  animation: rotating 1.5s 0s linear infinite;
  z-index: 4;


  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
}
`;
