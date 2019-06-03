import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Modal from 'react-modal';

import { METRICS } from 'redux/auditResults/constants';
import { MetricType } from 'redux/auditResults/types';
import { colorUsage, getSpacing } from 'stylesheet';
import Style from './MetricModal.style';
import MetricName from './MetricName';

interface OwnProps {
  projectId: string;
}

interface Props extends OwnProps {
  metrics: MetricType[];
  show: boolean;
  close: () => void;
  updateDisplayedMetrics: (projectId: string, selectedMetrics: MetricType[]) => void;
}

const MetricModal: React.FunctionComponent<Props> = ({
  metrics,
  show,
  close,
  updateDisplayedMetrics,
  projectId,
}) => {
  const modalStyles = {
    content: {
      width: '800px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: `${colorUsage.metricsModalBackground}`,
      boxShadow: `0 0 8px 4px ${colorUsage.metricsModalShadow}`,
      overflow: 'visible',
    },
    overlay: {
      zIndex: 3,
    },
  };

  const handleModalOpen = () => {
    document.body.style.overflow = 'hidden';
  };
  const handleModalClose = () => {
    updateSelectedMetrics(metrics);
    document.body.style.overflow = 'scroll';
  };

  const [selectedMetrics, updateSelectedMetrics] = useState(metrics);

  const updateMetrics = (event: MouseEvent, selectedValue: MetricType) => {
    if (selectedMetrics.indexOf(selectedValue) === -1) {
      updateSelectedMetrics(currentSelectedMetrics => [...currentSelectedMetrics, selectedValue]);
    } else {
      updateSelectedMetrics(currentSelectedMetrics =>
        currentSelectedMetrics.filter(metric => selectedValue !== metric),
      );
    }
  };

  const isMetricSelected = (selectedValue: MetricType) => {
    if (selectedMetrics.indexOf(selectedValue) === -1) {
      return false;
    }
    return true;
  };

  const submitDisplayedMetrics = (event: MouseEvent) => {
    event.preventDefault();
    updateDisplayedMetrics(projectId, selectedMetrics);
    close();
  };

  const metricModalRef = React.useRef<HTMLDivElement>(null);

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
      <Style.ModalInnerContainer ref={metricModalRef}>
        <Style.ModalTitle>
          <FormattedMessage id="Audits.MetricsModal.add_delete_metrics" />
        </Style.ModalTitle>
        <Style.MetricsContainer>
          {Object.keys(METRICS).map((metric, index) => {
            return (
              <Style.MetricItem key={index} margin={`0 0 ${getSpacing(2)} 0`}>
                <Style.ModalCheckbox
                  type="checkbox"
                  onClick={event => updateMetrics(event, metric as MetricType)}
                  checked={isMetricSelected(metric as MetricType)}
                  readOnly={true}
                />
                <Style.ModalCheckboxLabel margin={`0 ${getSpacing(3)} 0 0`} />
                <MetricName
                  metric={metric as MetricType}
                  modalRef={metricModalRef}
                  onClick={updateMetrics}
                >
                  <FormattedMessage id={`Metrics.${metric}.name`} />
                </MetricName>
              </Style.MetricItem>
            );
          })}
        </Style.MetricsContainer>
        <Style.ModalButtonsContainer>
          <Style.ModalCancelButton onClick={close} margin={`0 ${getSpacing(4)} 0 0`}>
            <FormattedMessage id="Audits.MetricsModal.cancel_button" />
          </Style.ModalCancelButton>
          <Style.ModalValidateButton onClick={submitDisplayedMetrics}>
            <FormattedMessage id="Audits.MetricsModal.validate_button" />
          </Style.ModalValidateButton>
        </Style.ModalButtonsContainer>
      </Style.ModalInnerContainer>
    </Modal>
  );
};

export default MetricModal;
