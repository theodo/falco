import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
`;

export const PageTitleBlock = styled.div`
  margin-bottom: ${getSpacing(4)};
  width: 75%;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
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

export const Title = styled.div`
  line-height: ${lineHeight.h2Text};
  color: ${colorUsage.h2Text};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.h2Text};
  font-weight: ${fontWeight.h2Text};
  margin-bottom: ${getSpacing(4)};
`;

export const ScriptStepBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ScriptStepBlockTitle = styled.div`
  font-size: ${fontSize.labelText};
  line-height: ${lineHeight.labelText};
  font-weight: ${fontWeight.labelText};
  color: ${colorUsage.labelText};
  margin-bottom: ${getSpacing(2)};
`;
