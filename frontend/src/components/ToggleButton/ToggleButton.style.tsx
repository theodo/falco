import styled from 'styled-components';
import { colorUsage, getSpacing, } from 'stylesheet';

interface ToggleButtonProps {
  checked: boolean;
}

export const ToggleButtonContainer= styled.label`
  display: flex;
  align-items: center;
`

export const ToggleButtonLabel = styled.span`
  margin-left: ${getSpacing(1)};
  font-weight: bold;
  text-transform: uppercase;
  color: ${(props: ToggleButtonProps) => props.checked 
    ? colorUsage.ToggleButtonActiveLabelColor
    : colorUsage.ToggleButtonDisabledLabelColor
  };
  transition-duration: 0.4s;
`
