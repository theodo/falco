import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Modal from 'react-modal';

import { METRICS } from 'redux/auditResults/constants';
import { MetricType } from 'redux/auditResults/types';
import { colorUsage, getSpacing } from 'stylesheet';
import Style from './MetricModal.style';

interface Props {
  metrics: MetricType[];
  show: boolean;
  close: () => void;
}

const MetricModal: React.FunctionComponent<Props> = props => {
  const { metrics, show, close } = props;

  const modalStyles = {
    content: {
      width: '800px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: `${getSpacing(5)} ${getSpacing(8)}`,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: `${colorUsage.metricsModalBackground}`,
      boxShadow: `0 0 8px 4px ${colorUsage.metricsModalShadow}`,
    },
    overlay: {
      zIndex: 3,
    },
  };

  const disableBackground = () => {
    document.body.style.overflow = 'hidden';
  };
  const enableBackground = () => {
    document.body.style.overflow = 'scroll';
  };

  return (
    <Modal
      isOpen={show}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      onRequestClose={close}
      style={modalStyles}
      onAfterOpen={disableBackground}
      onAfterClose={enableBackground}
      appElement={document.querySelector('#root') as HTMLElement}
    >
      <Style.ModalTitle>
        <FormattedMessage id="Audits.MetricsModal.add_delete_metrics" />
      </Style.ModalTitle>
      <Style.MetricsContainer>
        {Object.keys(METRICS).map((metric, index) => {
          return (
            <Style.MetricItem key={index} margin={`0 0 ${getSpacing(2)} 0`}>
              <Style.ModalCheckbox
                type="checkbox"
                defaultChecked={!!metrics.find(m => m === metric)}
              />
              <Style.ModalCheckboxLabel margin={`0 ${getSpacing(3)} 0 0`} />
              <Style.MetricName>
                <FormattedMessage id={`Metrics.${metric}.name`} />
              </Style.MetricName>
            </Style.MetricItem>
          );
        })}
      </Style.MetricsContainer>
      <Style.ModalButtonsContainer>
        <Style.ModalCancelButton onClick={close} margin={`0 ${getSpacing(4)} 0 0`}>
          <FormattedMessage id="Audits.MetricsModal.cancel_button" />
        </Style.ModalCancelButton>
        <Style.ModalValidateButton>
          <FormattedMessage id="Audits.MetricsModal.validate_button" />
        </Style.ModalValidateButton>
      </Style.ModalButtonsContainer>
    </Modal>
  );
};

export default MetricModal;
