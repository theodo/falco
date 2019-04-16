import styled from 'styled-components';

interface FormErrorProps {
  margin?: string;
}

const Styles = {
  Container: styled.div`
    margin: 100px auto 0;
    width: 400px;
    text-align: center;
  `,
  FormError: styled.div`
    padding: 12px;
    color: #d8000c;
    background-color: #ffd2d2;
    border-radius: 5px;
    margin: 0 0 30px 0;
    white-space: pre-wrap;
  `,
};

export default Styles;
