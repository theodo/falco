import React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import Modal from 'react-modal';

import ErrorMessage from 'components/ErrorMessage';
import MetricGraph from 'components/MetricGraph';
import Close from 'icons/Close';
import { AuditResultsAsGraphData, MetricType } from 'redux/auditResults/types';
import { PageType, ProjectType, ScriptType } from 'redux/projects/types';
import { colorUsage } from 'stylesheet';
import { CloseContainer, PageSubTitle, PageTitle } from './GraphModal.style';

export interface OwnProps {
  auditParametersId: string | null;
  project?: ProjectType;
  pageName: string;
  scriptName: string;
}


interface Props {
  metric: MetricType;
  auditResults: AuditResultsAsGraphData;
  show: boolean;
  close: () => void;
}

const GraphModal: React.FunctionComponent<OwnProps & Props & InjectedIntlProps> = ({ auditResults, metric, show, close, intl, auditParametersId, project, pageName, scriptName }) => {

  if (!project) {
    return (
      <ErrorMessage>
        <FormattedMessage id="Projects.no_project_error" />
      </ErrorMessage>
    );
  }

  if (!pageName && !scriptName) {
    return (
      <ErrorMessage>
        <FormattedMessage id="Projects.no_page_or_script_error" />
      </ErrorMessage>
    );
  }

  const pageOrScriptName = pageName || scriptName;

  const currentAuditParameter = project.auditParametersList.find(auditParametersOption => {
    return auditParametersOption.uuid === auditParametersId;
  });

  const currentAuditParameterName = currentAuditParameter ? currentAuditParameter.name : "";

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
      zIndex: 3,
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
        <PageTitle>
          {project.name + ' / ' + pageOrScriptName}
        </PageTitle>
        <PageSubTitle>{currentAuditParameterName}</PageSubTitle>
      </>
      <CloseContainer
        title={intl.formatMessage({ id: `components.MetricGraph.close` })}
        onClick={close}
      >
        <Close color={colorUsage.graphModalToggleButton} />
      </CloseContainer>
      <MetricGraph fullscreen={true} auditResults={auditResults} metrics={[metric]} showOnlyLastWeek={false} />
    </Modal>
  );
};

export default GraphModal;
