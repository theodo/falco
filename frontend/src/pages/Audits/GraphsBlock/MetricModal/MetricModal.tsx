import React, { MouseEvent, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Modal from 'react-modal';

import { METRICS } from 'redux/auditResults/constants';
import { MetricType } from 'redux/auditResults/types';
import { colorUsage, getSpacing, zIndex } from 'stylesheet';
import {
  MetricItem,
  MetricsContainer,
  ModalButtonsContainer,
  ModalCancelButton,
  ModalCheckbox,
  ModalCheckboxLabel,
  ModalInnerContainer,
  ModalTitle,
  ModalValidateButton,
} from './MetricModal.style';
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
      zIndex: zIndex.modal,
    },
  };

  const handleModalOpen = () => {
    document.body.style.overflow = 'hidden';
  };
  const handleModalClose = () => {
    updateSelectedMetrics(metrics);
    document.body.style.overflow = 'auto';
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
      <ModalInnerContainer ref={metricModalRef}>
        <ModalTitle>
          <FormattedMessage id="Audits.MetricsModal.add_delete_metrics" />
        </ModalTitle>
        <MetricsContainer>
          {(Object.keys(METRICS) as MetricType[]).map((metric, index) => {
            return (
              <MetricItem key={index} margin={`0 0 ${getSpacing(2)} 0`}>
                <ModalCheckbox
                  type="checkbox"
                  onClick={event => updateMetrics(event, metric)}
                  checked={isMetricSelected(metric)}
                  readOnly={true}
                />
                <ModalCheckboxLabel margin={`0 ${getSpacing(3)} 0 0`} />
                <MetricName metric={metric} modalRef={metricModalRef} onClick={updateMetrics}>
                  <FormattedMessage id={`Metrics.${metric}.name`} />
                </MetricName>
              </MetricItem>
            );
          })}
        </MetricsContainer>
        <ModalButtonsContainer>
          <ModalCancelButton onClick={close} margin={`0 ${getSpacing(4)} 0 0`}>
            <FormattedMessage id="Audits.MetricsModal.cancel_button" />
          </ModalCancelButton>
          <ModalValidateButton onClick={submitDisplayedMetrics}>
            <FormattedMessage id="Audits.MetricsModal.validate_button" />
          </ModalValidateButton>
        </ModalButtonsContainer>
      </ModalInnerContainer>
    </Modal>
  );
};

export default MetricModal;
