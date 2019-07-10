import React, { ReactNode } from 'react';
import { MessagePillContainer } from './MessagePill.style';

export type MessageType = "error" | "info";

interface Props {
  children?: ReactNode;
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  margin?: string;
  padding?: string;
  messageType: MessageType;
}

const MessagePill: React.FunctionComponent<Props> = ({ children, color, backgroundColor, fontSize, margin, padding, messageType }) => {
  return (
    <MessagePillContainer
      messageType={messageType}
      color={color}
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      margin={margin}
      padding={padding}
    >
      {children}
    </MessagePillContainer>
  );
};

export default MessagePill;
