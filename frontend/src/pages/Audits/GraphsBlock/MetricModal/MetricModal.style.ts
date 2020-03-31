import styled from 'styled-components';
import {
  colorUsage,
  fontFamily,
  fontSize,
  fontWeight,
  getSpacing,
  lineHeight,
  zIndex,
} from 'stylesheet';

interface ItemWithMarginProps {
  margin?: string;
}

export const ModalInnerContainer = styled.div`
  padding: ${getSpacing(5)} ${getSpacing(8)};
  display: flex;
  flex-direction: column;
`;

export const ModalTitle = styled.h2`
  line-height: ${lineHeight.h2Text};
  color: ${colorUsage.h2Text};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.h2Text};
  font-weight: ${fontWeight.h2Text};
  margin-bottom: ${getSpacing(6)};
  align-self: center;
`;

export const MetricsContainer = styled.div`
  column-count: 2;
`;

export const MetricItem = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
`;

export const ModalCheckboxLabel = styled.label`
  margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  width: 16px;
  height: 16px;
  background: ${colorUsage.checkboxBackground};
  border: 1px solid ${colorUsage.checkboxBorder};
`;

export const ModalButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-end;
`;

export const ModalCancelButton = styled.button`
  margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  padding: ${getSpacing(2)} ${getSpacing(4)};
  border-radius: 4px;
  border: 2px solid ${colorUsage.cancelButtonBorder};
  cursor: pointer;
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.button};
  font-weight: ${fontWeight.button};
  line-height: ${lineHeight.button};
  color: ${colorUsage.cancelButtonText};
  background-color: ${colorUsage.cancelButtonBackground};
`;

export const ModalValidateButton = styled.button`
  padding: ${getSpacing(2)} ${getSpacing(4)};
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.button};
  font-weight: ${fontWeight.button};
  line-height: ${lineHeight.button};
  color: ${colorUsage.validateButtonText};
  background-color: ${colorUsage.validateButtonBackground};
`;

/* stylelint-disable */
/**
 * ModalCheckbox depends on ModalCheckboxLabel so they can't be declared at the same time
 * Here we set the desired value of the ModalCheckbox once ModalCheckboxLabel has already been declared
 */
export const ModalCheckbox = styled.input`
  position: relative;
  left: 18px;
  opacity: 0;
  z-index: ${zIndex.metricModalCheckbox};
  width: 18px;
  height: 18px;
  cursor: pointer;
  &:checked + ${ModalCheckboxLabel} {
    &::after {
      content: '';
      display: block;
      margin: 3px 0 0 3px;
      width: 10px;
      height: 10px;
      background-color: ${colorUsage.checkboxColor};
    }
  }

  /**
  * Simulates outline css property for accessibility stakes
  */
  &:focus + ${ModalCheckboxLabel} {
    box-shadow: 0 0 0 2px rgb(77, 144, 254, .6);
  }
`;
/* stylelint-enable */

