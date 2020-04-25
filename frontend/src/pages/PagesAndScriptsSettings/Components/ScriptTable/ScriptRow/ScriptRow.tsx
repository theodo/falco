import Close from 'icons/Close';
import Edit from 'icons/Edit/Edit';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { toastr } from 'react-redux-toastr';
import { useAsyncFn } from 'react-use';
import { ProjectToastrDisplayType } from 'redux/entities/projects/types';
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
  setProjectToastrDisplay: (toastrDisplay: ProjectToastrDisplayType) => void;
  deleteScriptFromProjectSuccess: (payload: { projectId: string; scriptId: string }) => void;
} & OwnProps;

export const ScriptRow: React.FunctionComponent<Props> = ({
  scriptId,
  projectId,
  setProjectToastrDisplay,
  deleteScriptFromProjectSuccess,
  script,
}) => {
  const intl = useIntl();

  const [displayScriptModal, setDisplayScriptModal] = React.useState(false);

  // could’t find a way to not declare `state` using `useAsyncFn`
  // eslint-disable-next-line
  const [state, deleteScript] = useAsyncFn(
    async () => {
      try {
        const response = await makeDeleteRequest(
          `/api/projects/${projectId}/scripts/${scriptId}`,
          true,
        );
        if (!response) {
          throw new Error('No response');
        }
        deleteScriptFromProjectSuccess({ projectId, scriptId });
        setProjectToastrDisplay('deleteScriptSuccess');
      } catch (e) {
        setProjectToastrDisplay('deleteScriptError');
      }
    },
    [projectId, scriptId],
  );

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
