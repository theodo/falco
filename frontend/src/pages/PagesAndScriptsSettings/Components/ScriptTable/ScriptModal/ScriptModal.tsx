import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import Modal from 'react-modal';
import { useAsyncFn } from 'react-use';

import Close from 'icons/Close';
import { ProjectToastrDisplayType } from 'redux/entities/projects/types';
import { modelizeScript } from 'redux/entities/scripts/modelizer';
import { ScriptType } from 'redux/entities/scripts/types';
import { makePostRequest, makePutRequest } from 'services/networking/request';
import { colorUsage, modalSize, zIndex } from 'stylesheet';
import { CloseContainer, ConfirmButton, Loader, NameInput, PageTitle, ScriptInput } from './ScriptModal.style';

export interface OwnProps {
  scriptId: string;
}

type Props = {
  display: boolean;
  projectId: string;
  script: ScriptType | undefined | null
  close: () => void;
  addScriptToProjectSuccess: (projectId: string, scriptId: string) => void;
  addScript: (byId: Record<string, ScriptType>) => void;
  editScriptSuccess: (byId: Record<string, ScriptType>) => void;
  setProjectToastrDisplay: (toastrDisplay: ProjectToastrDisplayType) => void;
} & InjectedIntlProps & OwnProps;

export const ScriptModal: React.FunctionComponent<Props> = ({
  display,
  close,
  projectId,
  scriptId,
  script,
  addScriptToProjectSuccess,
  addScript,
  editScriptSuccess,
  setProjectToastrDisplay,
  intl,
}) => {
  const [scriptContent, setScriptContent] = React.useState(script ? script.script : "");
  const [scriptName, setScriptName] = React.useState(script ? script.name : "");

  const [state, createScript] = useAsyncFn(async () => {
    try {
      const response = await makePostRequest(`/api/projects/${projectId}/scripts`, true, {
        name: scriptName,
        script: scriptContent,
      });
      if (!response) {
        throw new Error("No response")
      }
      const modelizedScript = modelizeScript(response.body)
      addScript({ [modelizedScript.uuid]: modelizedScript })
      addScriptToProjectSuccess(projectId, modelizedScript.uuid)
      setProjectToastrDisplay('addScriptToProjectSuccess')
      close()
    } catch(e) {
      setProjectToastrDisplay('addScriptToProjectError')
    }
  }, [projectId, scriptContent, scriptName]);

  const [editState, editScript] = useAsyncFn(async () => {
    try {
      const response = await makePutRequest(`/api/projects/${projectId}/scripts/${scriptId}`, true, {
        name: scriptName,
        script: scriptContent,
      });
      if (!response) {
        throw new Error("No response")
      }
      const modelizedScript = modelizeScript(response.body)
      setProjectToastrDisplay('editScriptSuccess')
      editScriptSuccess({ [modelizedScript.uuid]: modelizedScript })
      close()
    } catch(e) {
      setProjectToastrDisplay('editScriptError')
    }
  }, [projectId, scriptContent, scriptName]);

  const modalStyles = {
    content: {
      height: `${window.innerHeight - 100}px`,
      width: `${modalSize.medium}`,
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: `${colorUsage.metricsModalBackground}`,
      boxShadow: `0 0 8px 4px ${colorUsage.metricsModalShadow}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    overlay: {
      zIndex: `${zIndex.modal}`,
    },
  };

  const handleModalClose = () => {
    if (!script) { // clear creation modal on close
      setScriptContent("")
      setScriptName("")
    }
  };

  const handleNameChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setScriptName((event.target as HTMLInputElement).value)
  }

  const handleScriptChange = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    setScriptContent((event.target as HTMLInputElement).value)
  }

  return (
    <React.Fragment>
    <Modal
      isOpen={display}
      shouldCloseOnEsc
      onRequestClose={close}
      shouldCloseOnOverlayClick
      style={modalStyles}
      appElement={document.querySelector('#root') as HTMLElement}
      onAfterClose={handleModalClose}
    >
      <PageTitle>{intl.formatMessage({ id: `ProjectSettings.script_modal_title`})}</PageTitle>
      <NameInput
        onChange={handleNameChange}
        value={scriptName}
        placeholder={intl.formatMessage({ id: `ProjectSettings.script_name_placeholder`})}
      />
      <ScriptInput onChange={handleScriptChange} value={scriptContent} />
      <ConfirmButton onClick={script ? editScript : createScript}>
        {intl.formatMessage({ id: script ? `ProjectSettings.script_confirm_edition`
        : `ProjectSettings.script_confirm_creation`})}
      </ConfirmButton>
      <CloseContainer onClick={close} >
        <Close color={colorUsage.graphModalToggleButton} />
      </CloseContainer>
    </Modal>
    {state.loading || editState.loading ? <Loader/> : null}
    </React.Fragment>
  );
};

export default ScriptModal;
