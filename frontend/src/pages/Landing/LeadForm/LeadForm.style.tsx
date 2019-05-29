import { Field, Form } from 'formik';
import styled from 'styled-components';

import {
  colorUsage,
  fontFamily,
  fontSize,
  fontWeight,
  getSpacing,
  lineHeight,
  responsiveThreshold,
} from 'stylesheet';
const Styles = {
  Container: styled.div`
    grid-row-start: 3;
    grid-column-start: 1;
    width: 470px;
    display: flex;
    flex-direction: column;
    margin: auto;

    @media only screen and (max-width: ${responsiveThreshold}) {
      grid-row-start: 4;
      grid-column-start: 1;
      width: 245px;
      padding: 0 ${getSpacing(7)};
      margin: 0 0 ${getSpacing(6)} 0;
    }
  `,

  LeadForm: styled(Form)`
    height: 54px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 6px;
    border: 1px solid ${colorUsage.leadFormBorder};
    padding-left: ${getSpacing(5)};

    @media only screen and (max-width: ${responsiveThreshold}) {
      height: auto;
      flex-wrap: wrap;
      padding-left: 0;
      border: none;
      margin: auto;
    }
  `,

  EmailField: styled(Field)``,

  SubmitButton: styled.button`
    position: relative;
    right: -1px;
    margin-left: ${getSpacing(5)};
    height: 56px;
    white-space: nowrap;
    border-radius: 6px;
    border: none;
    outline: none;
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.submitButton};
    font-weight: ${fontWeight.submitButton};
    line-height: ${lineHeight.submitButton};
    color: ${colorUsage.submitButtonText};
    transition: all 0.5s ease;
    background-color: ${colorUsage.leadSubmitButtonBackground};

    &.normal {
      cursor: pointer;
    }

    &.submittingRequest {
      background-color: ${colorUsage.leadSubmitButtonWaitingBackground};
    }

    &.requestSucceeded {
      background-color: ${colorUsage.leadSubmitButtonSuccessBackground};
    }

    @media only screen and (max-width: ${responsiveThreshold}) {
      margin: auto;
    }
  `,

  SubmitButtonContent: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 ${getSpacing(2)};
  `,

  Loader: styled.div`
    width: 18px;
    height: 18px;
    border-radius: 18px;
    margin-right: ${getSpacing(2)};
    border: 2px solid ${colorUsage.leadSubmitButtonLoaderSecondary};
    border-left-color: ${colorUsage.leadSubmitButtonLoaderPrimary};
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

  CheckmarkContainer: styled.div`
    width: 18px;
    height: 18px;
    margin-right: ${getSpacing(2)};
  `,

  Checkmark: styled.div`
    position: relative;

    &::after {
      animation: checkmark 1s 0s ease;
      transform: scaleX(-1) rotate(135deg);
      opacity: 1;
      height: 9px;
      width: 4px;
      transform-origin: left top;
      border-right: 3px solid ${colorUsage.leadSubmitButtonSuccessCheck};
      border-top: 3px solid ${colorUsage.leadSubmitButtonSuccessCheck};
      content: '';
      left: 4px;
      top: 9px;
      position: absolute;
    }

    @keyframes checkmark {
      0% {
        height: 0;
        width: 0;
        opacity: 1;
      }
      20% {
        height: 0;
        width: 4px;
        opacity: 1;
      }
      40% {
        height: 9px;
        width: 4px;
        opacity: 1;
      }
      100% {
        height: 9px;
        width: 4px;
        opacity: 1;
      }
    }
  `,
};

export default Styles;
