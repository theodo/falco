import styled from 'styled-components';
import { colorUsage, fontSize, getSpacing } from 'stylesheet';

interface Props {
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  margin?: string;
  padding?: string;
}

export const InfoMessageContainer = styled.div`
  border-radius: ${getSpacing(1)};
  white-space: pre-wrap;
  color: ${(props: Props) => props.color || colorUsage.popinInfoText};
  background-color: ${(props: Props) => props.backgroundColor || colorUsage.popinInfoBackground};
  padding: ${(props: Props) => props.padding || getSpacing(3)};
  margin: ${(props: Props) => props.margin || getSpacing(8)};
  font-size: ${(props: Props) => props.fontSize || fontSize.bodyText};
`;
