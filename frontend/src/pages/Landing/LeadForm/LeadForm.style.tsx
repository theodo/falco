import { Field, Form } from 'formik';
import styled from 'styled-components';

import { colorUsage, fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

const Styles = {
  Container: styled.div`
    width: 470px;
    display: flex;
    flex-direction: column;
  `,

  LeadForm: styled(Form)`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  `,

  EmailField: styled(Field)``,

  SubmitButton: styled.button`
    padding: ${getSpacing(2)} ${getSpacing(4)};
    border-radius: 6px;
    border: none;
    outline: none;
    cursor: pointer;
    font-family: ${fontFamily.mainSans};
    font-size: ${fontSize.submitButton};
    font-weight: ${fontWeight.submitButton};
    line-height: ${lineHeight.submitButton};
    color: ${colorUsage.submitButtonText};
    background-color: ${colorUsage.submitButtonBackground};
  `,
};

export default Styles;
