import React from 'react';
import Modal from 'react-modal';

import MetricGraph from 'components/MetricGraph';
import Close from 'icons/Close';
import { AuditResultsAsGraphData, MetricType } from 'redux/auditResults/types';
import { colorUsage } from 'stylesheet';
import Style from './GraphModal.style';

interface Props {
  metric: MetricType;
  auditResults: AuditResultsAsGraphData;
  show: boolean;
  close: () => void;
}

const GraphModal: React.FunctionComponent<Props> = props => {
  const { auditResults, metric, show, close } = props;

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
    document.body.style.overflow = 'scroll';
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
      <Style.Close onClick={close}>
        <Close color={colorUsage.graphModalToggleButton} />
      </Style.Close>
      <MetricGraph fullscreen={true} auditResults={auditResults} metrics={[metric]} />
    </Modal>
  );
};

export default GraphModal;
