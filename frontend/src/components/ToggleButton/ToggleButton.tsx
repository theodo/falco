import * as React from 'react';
import Switch from "react-switch";
import { colorUsage } from 'stylesheet';
import { ToggleButtonContainer, ToggleButtonLabel } from './ToggleButton.style';

export interface OwnProps {
  onChange: () => void;
  checked: boolean;
  label: string;
}

const ToggleButton: React.FunctionComponent<OwnProps> = ({
  onChange,
  checked,
  label
}) => {
  const [isChecked, setChecked] = React.useState(checked)

  const handleChange = () => {
    setChecked(!isChecked);
  }

  return (


    <ToggleButtonContainer>
      <Switch
        onColor={colorUsage.ToggleButtonActiveBackground}
        offColor={colorUsage.ToggleButtonDisabledBackground}
        handleDiameter={20}
        uncheckedIcon={false}
        checkedIcon={false}
        onChange={handleChange}
        checked={isChecked}
      />
      <ToggleButtonLabel checked={isChecked}>{label}</ToggleButtonLabel>
    </ToggleButtonContainer>
  )
};

export default ToggleButton;
