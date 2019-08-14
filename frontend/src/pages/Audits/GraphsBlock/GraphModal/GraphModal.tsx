import React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import Modal from 'react-modal';

import Loader from 'components/Loader';
import MessagePill from 'components/MessagePill';
import MetricGraph from 'components/MetricGraph';
import Close from 'icons/Close';
import { AuditResultsAsGraphData, MetricType } from 'redux/auditResults/types';
import { colorUsage, zIndex } from 'stylesheet';
import { CloseContainer, PageSubTitle, PageTitle } from './GraphModal.style';

export interface OwnProps {
  projectName: string;
  pageName: string;
  scriptName: string;
  currentAuditParametersName: string;
}

interface Props {
  metric: MetricType;
  auditResults: AuditResultsAsGraphData;
  show: boolean;
  isLoading: boolean;
  close: () => void;
}

const GraphModal: React.FunctionComponent<OwnProps & Props & InjectedIntlProps> = ({
  auditResults,
  metric,
  show,
  close,
  intl,
  projectName,
  pageName,
  scriptName,
  currentAuditParametersName,
  isLoading
}) => {
  if (!projectName) {
    return (
      <MessagePill messageType="error">
        <FormattedMessage id="Projects.no_project_error" />
      </MessagePill>
    );
  }

  if (!pageName && !scriptName) {
    return (
      <MessagePill messageType="error">
        <FormattedMessage id="Projects.no_page_or_script_error" />
      </MessagePill>
    );
  }

  const pageOrScriptName = pageName || scriptName;

  const modalStyles = {
    content: {
      height: `${window.innerHeight - 100}px`,
      width: '1375px',
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
      isOpen={show}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      onRequestClose={close}
      style={modalStyles}
      onAfterOpen={handleModalOpen}
      onAfterClose={handleModalClose}
      appElement={document.querySelector('#root') as HTMLElement}
    >
      <>
        <PageTitle>{projectName + ' / ' + pageOrScriptName}</PageTitle>
        {auditResults && auditResults[0] && auditResults[0].scriptStepName && (
          <PageSubTitle>{auditResults[0].scriptStepName}</PageSubTitle>
        )}
        <PageSubTitle>{currentAuditParametersName}</PageSubTitle>
      </>
      <CloseContainer
        title={intl.formatMessage({ id: `components.MetricGraph.close` })}
        onClick={close}
      >
        <Close color={colorUsage.graphModalToggleButton} />
      </CloseContainer>
      {isLoading 
        ? <Loader /> 
        : <MetricGraph
            fullscreen={true}
            auditResults={auditResults}
            metrics={[metric]}
            showOnlyLastWeek={false}
        />
      }
    </Modal>
  );
};

export default GraphModal;
