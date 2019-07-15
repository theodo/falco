import React, { ReactNode } from 'react';
import { MessageCloseContainer, MessagePillContainer } from './MessagePill.style';

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
  const [showMessage, setShowMessage] = React.useState(true);
  return showMessage
    ? (
      <MessagePillContainer
        messageType={messageType}
        color={color}
        backgroundColor={backgroundColor}
        fontSize={fontSize}
        margin={margin}
        padding={padding}
      >
        <>{children}</>
        <MessageCloseContainer
          onClick={() => setShowMessage(false)}
        >
          &times;
        </MessageCloseContainer>
      </MessagePillContainer >
    )
    : null;
};

export default MessagePill;
