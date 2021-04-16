import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

export const NotFoundContainer = styled.div`
  height: 400px;
  display: flex;
`;

export const NotFoundInsideContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NotFoundTitle = styled.span`
  color: ${colorUsage.h1Text};
  line-height: ${lineHeight.h1Text};
  font-weight: ${fontWeight.h1Text};
  font-size: ${fontSize.h1Text};
`;

export const NotFoundSubTitle = styled.span`
  color: ${colorUsage.h3Text};
  line-height: ${lineHeight.h3Text};
  font-weight: ${fontWeight.h3Text};
  font-size: ${fontSize.h3Text};
`;

export const NotFoundButton = styled.a`
  width: 170px;
  margin-top: 30px;
  padding: ${getSpacing(2)} ${getSpacing(0)};
  border-radius: 6px;
  color: ${colorUsage.notFoundButtonText};
  background-color: ${colorUsage.notFoundButtonBackground};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.notFoundButton};
  font-weight: ${fontWeight.notFoundButton};
  line-height: ${lineHeight.notFoundButton};
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;
