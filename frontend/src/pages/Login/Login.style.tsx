import { Field, Form } from 'formik';
import styled from 'styled-components';
import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

interface ItemWithMarginProps {
  margin?: string;
}

const Styles = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    padding: ${getSpacing(20)} 0;
    display: flex;
    flex-direction: column;
  `,

  LoginForm: styled(Form)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,

  InputFieldContainer: styled.div`
    margin: ${(props: ItemWithMarginProps) => props.margin || '0'};
  `,

  InputField: styled(Field)``,

  ConnectButton: styled.button`
    min-height: 38px;
    border-radius: 6px;
    border: none;
    outline: none;
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.submitButton};
    font-weight: ${fontWeight.submitButton};
    line-height: ${lineHeight.submitButton};
    color: ${colorUsage.submitButtonText};
    transition: all 0.5s ease;
    background-color: ${colorUsage.submitButtonBackground};

    &.normal {
      cursor: pointer;
    }

    &.submittingRequest {
      background-color: ${colorUsage.connectButtonWaitingBackground};
    }
  `,

  ConnectButtonContent: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${getSpacing(1)} ${getSpacing(3)};
  `,

  Loader: styled.div`
    width: 18px;
    height: 18px;
    border-radius: 18px;
    margin-right: ${getSpacing(3)};
    border: 2px solid ${colorUsage.connectButtonLoaderSecondary};
    border-left-color: ${colorUsage.connectButtonLoaderPrimary};
    animation: rotating 1.5s 0s linear infinite;

    @keyframes rotating {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,
};

export default Styles;
