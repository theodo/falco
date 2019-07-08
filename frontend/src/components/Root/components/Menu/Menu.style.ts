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

export const Container = styled.div`
  position: fixed;
  top: 100px;
  z-index: ${zIndex.menu};
  background-color: ${colorUsage.menuBackground};
  padding-left: ${getSpacing(22)};
  padding-top: ${getSpacing(4)};
  width: 380px;
  height: 100%;
`;

export const ProjectName = styled.div`
  line-height: ${lineHeight.h2Text};
  color: ${colorUsage.h2Text};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.h2Text};
  font-weight: ${fontWeight.h2Text};
  margin-bottom: ${getSpacing(4)};
  padding: 0 ${getSpacing(3)};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AuditParametersBlock = styled.div`
  margin-bottom: ${getSpacing(4)};
  padding: 0 ${getSpacing(3)};
  display: flex;
  flex-direction: column;
`;

export const AuditParametersTitle = styled.div`
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.labelText};
  line-height: ${lineHeight.labelText};
  font-weight: ${fontWeight.labelText};
  color: ${colorUsage.labelText};
  margin-bottom: ${getSpacing(2)};
`;

export const Audits = styled.div`
  line-height: ${lineHeight.h3Text};
  color: ${colorUsage.h3Text};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.h3Text};
  font-weight: ${fontWeight.h3Text};
  padding: 0 ${getSpacing(3)} ${getSpacing(4)} ${getSpacing(3)};
`;
