import styled from 'styled-components';
import { getSpacing } from 'stylesheet';

interface ToggleButtonProps {
  color: string;
  disabled: boolean;
}

export const ToggleButtonContainer = styled.label`
  display: flex;
  align-items: center;
`;

export const ToggleButtonLabel = styled.span`
  margin-left: ${getSpacing(1)};
  font-weight: bold;
  text-transform: uppercase;
  color: ${(props: ToggleButtonProps) => props.color};
  transition-duration: 0.4s;
  opacity: ${(props: ToggleButtonProps) => (props.disabled ? 0.5 : 1)};
`;
