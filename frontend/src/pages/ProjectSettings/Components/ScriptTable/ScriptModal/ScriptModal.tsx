import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import Modal from 'react-modal';

import Close from 'icons/Close';
import { colorUsage, zIndex } from 'stylesheet';
import { CloseContainer, PageTitle } from './ScriptModal.style';


interface Props {
  display: boolean;
  close: () => void;
}

export const ScriptModal: React.FunctionComponent<Props & InjectedIntlProps> = ({
  display,
  close,
  intl,
}) => {

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

  return (
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
      <>
        <PageTitle>{intl.formatMessage({ id: `ProjectSettings.script_modal_title`})}</PageTitle>
      </>
      <CloseContainer
        onClick={close}
      >
        <Close color={colorUsage.graphModalToggleButton} />
      </CloseContainer>
    </Modal>
  );
};

export default ScriptModal;
