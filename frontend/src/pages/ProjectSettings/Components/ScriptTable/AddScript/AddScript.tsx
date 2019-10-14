import { Add } from 'icons';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { colorUsage } from 'stylesheet';
import { ScriptModal } from '../ScriptModal';
import { AddScriptButtonContainer, AddScriptButtonLabel } from '../ScriptTable.style';

export const AddScript: React.FunctionComponent<InjectedIntlProps> = ({
  intl
  }) => {

  const [displayScriptModal, setDisplayScriptModal] = React.useState(false);

  const openScriptModal = () => {
    setDisplayScriptModal(true);
  };
  const closeScriptModal = () => {
    setDisplayScriptModal(false);
  };

  return (
    <React.Fragment>
      <AddScriptButtonContainer onClick={openScriptModal}>
        <Add
          color={colorUsage.projectSettingsIconColor}
          width="24px"
          strokeWidth="20"
        />
        <AddScriptButtonLabel>
          {intl.formatMessage({id: 'ProjectSettings.add_audit_parameter'})}
        </AddScriptButtonLabel>
      </AddScriptButtonContainer >
        <ScriptModal
          display={displayScriptModal}
          close={closeScriptModal}
        />
      </React.Fragment>
  )
}
