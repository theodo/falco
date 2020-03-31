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

export const Container = styled.div`
  margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  width: 670px;
  display: flex;
  flex-direction: column;
`;

export const SubTitle = styled.div`
  margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  line-height: ${lineHeight.h3Text};
  color: ${colorUsage.h3Text};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.h3Text};
  font-weight: ${fontWeight.h3Text};
`;

export const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: ${getSpacing(4)};
`;

export const FormLabel = styled.div`
  width: 50%;
  color: ${colorUsage.labelText};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.labelText};
  font-weight: ${fontWeight.labelText};
  line-height: ${lineHeight.labelText};
`;

export const FormInputs = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

export const OptionContainer = styled.div`
  margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  color: ${colorUsage.bodyText};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.bodyText};
  line-height: ${lineHeight.bodyText};
  display: flex;
  align-items: center;
`;

export const RadioButtonLabel = styled.label`
  margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${colorUsage.webPageTestRadioButtonBackground};
  border: 1px solid ${colorUsage.webPageTestRadioButtonBorder};
`;

export const RadioButtonText = styled.div`
  cursor: pointer;
`;

export const WebPageTestLink = styled.a`
  width: 170px;
  padding: ${getSpacing(2)} ${getSpacing(0)};
  align-self: flex-end;
  border-radius: 6px;
  color: ${colorUsage.webPageTestLinkButtonText};
  background-color: ${colorUsage.webPageTestLinkButtonBackground};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.webPageTestLink};
  font-weight: ${fontWeight.webPageTestLink};
  line-height: ${lineHeight.webPageTestLink};
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DateSelectorContainer = styled.div`
  margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

export const DateTitle = styled.div`
  color: ${colorUsage.labelText};
  font-family: ${fontFamily.mainSans};
  font-size: ${fontSize.labelText};
  font-weight: ${fontWeight.labelText};
  line-height: ${lineHeight.labelText};
  margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
`;

/* stylelint-disable */
/**
 * RadioButton depends on RadioButtonLabel so they can't be declared at the same time
 * Here we set the desired value of the RadioButton once RadioButtonLabel has already been declared
 */
export const RadioButton = styled.input`
  position: relative;
  left: 16px;
  opacity: 0;
  z-index: ${zIndex.webPageTestRadioButton};
  width: 16px;
  height: 16px;
  &:checked + ${RadioButtonLabel} {
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      margin: 4px 0 0 4px;
      width: 8px;
      height: 8px;
      background: ${colorUsage.webPageTestRadioButtonColor};
    }
  }

/**
  * Simulates outline css property for accessibility stakes
  */
  &:focus + ${RadioButtonLabel} {
    box-shadow: 0 0 0 2px rgb(77, 144, 254, .6);
  }
`;
/* stylelint-enable */
