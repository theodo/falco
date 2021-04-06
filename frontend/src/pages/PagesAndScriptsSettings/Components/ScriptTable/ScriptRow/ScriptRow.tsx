import Close from 'icons/Close';
import Edit from 'icons/Edit/Edit';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { toastr } from 'react-redux-toastr';
import { useAsyncFn } from 'react-use';
import { useToastr } from 'redux/entities/projects/hooks';
import { ScriptType } from 'redux/entities/scripts/types';
import { makeDeleteRequest } from 'services/networking/request';
import { colorUsage } from 'stylesheet';
import { ScriptModal } from '../ScriptModal';
import {
  EditIconContainer,
  NameHeader,
  Script,
  ScriptDeleteButton,
  ScriptDeleteContainer,
} from '../ScriptTable.style';

export interface OwnProps {
  scriptId: string;
  projectId: string;
}

type Props = {
  script: ScriptType | null | undefined;
  deleteScriptFromProjectSuccess: (payload: { projectId: string; scriptId: string }) => void;
} & OwnProps;

export const ScriptRow: React.FunctionComponent<Props> = ({
  scriptId,
  projectId,
  deleteScriptFromProjectSuccess,
  script,
}) => {
  const intl = useIntl();
  const { setToastrDisplay } = useToastr();

  const [displayScriptModal, setDisplayScriptModal] = React.useState(false);

  const [, deleteScript] = useAsyncFn(async () => {
    try {
      const response = await makeDeleteRequest(
        `/api/projects/${projectId}/scripts/${scriptId}`,
        true,
      );
      if (!response) {
        throw new Error('No response');
      }
      deleteScriptFromProjectSuccess({ projectId, scriptId });
      setToastrDisplay('deleteScriptSuccess');
    } catch (e) {
      setToastrDisplay('deleteScriptError');
    }
  }, [projectId, scriptId, setToastrDisplay]);

  const openScriptModal = () => {
    setDisplayScriptModal(true);
  };
  const closeScriptModal = () => {
    setDisplayScriptModal(false);
  };

  const handleScriptDeletion = () => {
    toastr.confirm(
      intl.formatMessage({ id: 'Toastr.ProjectSettings.delete_script_confirm_question' }),
      {
        onOk: () => deleteScript(),
      },
    );
  };

  if (null === script || undefined === script) {
    return null;
  }

  return (
    <React.Fragment>
      <NameHeader>{script.name}</NameHeader>
      <Script>{script.script}</Script>
      <EditIconContainer onClick={openScriptModal}>
        <Edit color={colorUsage.scriptRowIcon} width="1rem" height="1rem" />
      </EditIconContainer>
      <ScriptDeleteContainer>
        <ScriptDeleteButton onClick={handleScriptDeletion}>
          <Close color={colorUsage.projectSettingsIconColor} width="13px" strokeWidth="15" />
        </ScriptDeleteButton>
      </ScriptDeleteContainer>
      <ScriptModal
        display={displayScriptModal}
        close={closeScriptModal}
        projectId={projectId}
        scriptId={scriptId}
      />
    </React.Fragment>
  );
};
