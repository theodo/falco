import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import Modal from 'react-modal';

import MetricGraph from 'components/MetricGraph';
import Close from 'icons/Close';
import { AuditResultsAsGraphData, MetricType } from 'redux/auditResults/types';
import { PageType, ProjectType, ScriptType } from 'redux/projects/types';
import { colorUsage } from 'stylesheet';
import Style from './GraphModal.style';

export interface OwnProps {
  auditParametersId: string | null;
  project?: ProjectType;
  page?: PageType;
  script?: ScriptType;
}


interface Props {
  metric: MetricType;
  auditResults: AuditResultsAsGraphData;
  show: boolean;
  close: () => void;
}

const GraphModal: React.FunctionComponent<OwnProps & Props & InjectedIntlProps> = props => {
  const { auditResults, metric, show, close, intl, auditParametersId, project, page, script } = props;

  if (!project) {
    return null;
  }

  const pageOrScriptName = page ? page.name : script ? script.name : undefined;
  const auditParametersSelectOptions = project.auditParametersList.map(auditParameters => ({
    value: auditParameters.uuid,
    label: auditParameters.name,
  }));
  const currentAuditParameter = auditParametersSelectOptions.find(auditParametersOption => {
    return auditParametersOption.value === auditParametersId;
  });

  const currentAuditParameterName = currentAuditParameter ? currentAuditParameter.label : "";

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
      {
        project && pageOrScriptName && (
          <div>
            <Style.PageTitle>
              {project.name + ' / ' + pageOrScriptName}
            </Style.PageTitle>
            <Style.PageSubTitle>{currentAuditParameterName}</Style.PageSubTitle>
          </div>
        )
      }
      <Style.Close
        title={intl.formatMessage({ id: `components.MetricGraph.close` })}
        onClick={close}
      >
        <Close color={colorUsage.graphModalToggleButton} />
      </Style.Close>
      <MetricGraph fullscreen={true} auditResults={auditResults} metrics={[metric]} showOnlyLastWeek={false}/>
    </Modal>
  );
};

export default GraphModal;
