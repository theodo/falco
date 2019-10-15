import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import Modal from 'react-modal';
import { useAsyncFn } from 'react-use';

import Close from 'icons/Close';
import { ProjectToastrDisplayType } from 'redux/entities/projects/types';
import { modelizeScript } from 'redux/entities/scripts/modelizer';
import { ScriptType } from 'redux/entities/scripts/types';
import { makePostRequest } from 'services/networking/request';
import { colorUsage, zIndex } from 'stylesheet';
import { CloseContainer, ConfirmButton, Loader, NameInput, PageTitle, ScriptInput } from './ScriptModal.style';


type Props = {
  display: boolean;
  projectId: string;
  close: () => void;
  addScriptToProjectSuccess: (projectId: string, scriptId: string) => void;
  addScript: (byId: Record<string, ScriptType>) => void;
  setProjectToastrDisplay: (toastrDisplay: ProjectToastrDisplayType) => void;
} & InjectedIntlProps;

export const ScriptModal: React.FunctionComponent<Props> = ({
  display,
  close,
  projectId,
  addScriptToProjectSuccess,
  addScript,
  setProjectToastrDisplay,
  intl,
}) => {
  const [script, setScript] = React.useState("");
  const [scriptName, setScriptName] = React.useState("");

  const [state, createScript] = useAsyncFn(async () => {
    try {
      const response = await makePostRequest(`/api/projects/${projectId}/scripts`, true, {
        name: scriptName,
        script,
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
  }, [projectId, script, scriptName]);

  const modalStyles = {
    content: {
      height: `${window.innerHeight - 100}px`,
      width: '1000px',
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

  const handleModalOpen = () => {
    document.body.style.overflow = 'hidden';
  };
  const handleModalClose = () => {
    document.body.style.overflow = 'auto';
  };

  const handleNameChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setScriptName((event.target as HTMLInputElement).value)
  }

  const handleScriptChange = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    setScript((event.target as HTMLInputElement).value)
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
      onAfterOpen={handleModalOpen}
      onAfterClose={handleModalClose}
    >
      <PageTitle>{intl.formatMessage({ id: `ProjectSettings.script_modal_title`})}</PageTitle>
      <NameInput
        onChange={handleNameChange}
        placeholder={intl.formatMessage({ id: `ProjectSettings.script_name_placeholder`})}
      />
      <ScriptInput
        onChange={handleScriptChange}
      />
      <ConfirmButton onClick={createScript}>
        {intl.formatMessage({ id: `ProjectSettings.script_confirm_creation`})}
      </ConfirmButton>
      <CloseContainer
        onClick={close}
      >
        <Close color={colorUsage.graphModalToggleButton} />
      </CloseContainer>
    </Modal>
    {state.loading ? <Loader/> : null}
    </React.Fragment>
  );
};

export default ScriptModal;
