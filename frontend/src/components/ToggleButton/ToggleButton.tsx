import * as React from 'react';
import Switch from 'react-switch';
import { colorUsage } from 'stylesheet';
import { ToggleButtonContainer, ToggleButtonLabel } from './ToggleButton.style';

export interface OwnProps {
  onChange: () => void;
  checked: boolean;
  label: string;
  disabled: boolean;
}

const ToggleButton: React.FunctionComponent<OwnProps> = ({
  onChange,
  checked,
  label,
  disabled,
}) => {
  return (
    <ToggleButtonContainer>
      <Switch
        onColor={colorUsage.ToggleButtonActiveBackground}
        offColor={colorUsage.ToggleButtonDisabledBackground}
        handleDiameter={20}
        uncheckedIcon={false}
        checkedIcon={false}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
      <ToggleButtonLabel
        color={
          checked
            ? colorUsage.ToggleButtonActiveLabelColor
            : colorUsage.ToggleButtonDisabledLabelColor
        }
        disabled={disabled}
      >
        {label}
      </ToggleButtonLabel>
    </ToggleButtonContainer>
  );
};

export default ToggleButton;
