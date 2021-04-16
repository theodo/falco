import Button from 'components/Button';
import styled from 'styled-components';
import { colorUsage, fontSize, getSpacing, inheritVar } from 'stylesheet';
import { MessageType } from './MessagePill';

interface Props {
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  margin?: string;
  padding?: string;
  messageType: MessageType;
}

const messageTypesBackgroundColors = {
  error: colorUsage.popinErrorBackground,
  info: colorUsage.popinInfoBackground,
};

const messageTypesColors = {
  error: colorUsage.popinErrorText,
  info: colorUsage.popinInfoText,
};

/* stylelint-disable scale-unlimited/declaration-strict-value */
export const MessagePillContainer = styled.div`
  border-radius: ${getSpacing(1)};
  white-space: pre-wrap;
  color: ${(props: Props) => props.color || messageTypesColors[props.messageType]};
  background-color: ${(props: Props) =>
    props.backgroundColor || messageTypesBackgroundColors[props.messageType]};
  padding: ${(props: Props) => props.padding || getSpacing(3)};
  margin: ${(props: Props) => props.margin || getSpacing(8)};
  font-size: ${(props: Props) => props.fontSize || fontSize.bodyText};
  display: flex;
  justify-content: space-between;
`;
/* stylelint-enable */

export const MessageCloseContainer = styled(Button)`
  text-align: right;
  width: fit-content;
  height: 100%;
  color: ${inheritVar};
  font-size: ${inheritVar};
  font-family: ${inheritVar};
`;

export const MessageCloseContainerText = styled.span`
  height: 100%;
  display: block;
`;
