import styled from 'styled-components';
import { colorUsage } from 'stylesheet';

interface Props {
  color?: string;
  margin?: string;
  padding?: string;
  minHeight?: string;
}

const Style = {
  LoaderContainer: styled.div`
    width: 100%;
    height: 100%;
    min-height: ${(props: Props) => props.minHeight || '400px'};
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props: Props) => props.color || colorUsage.loader};
    padding: ${(props: Props) => props.padding || '0'};
    margin: ${(props: Props) => props.margin || '0'};
  `,

  // Found on https://loading.io/css/
  /* stylelint-disable */
  CircularProgress: styled.div`
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
    & div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 51px;
      height: 51px;
      margin: 6px;
      border: 6px solid #cef;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: ${(props: Props) => props.color || colorUsage.loader} transparent transparent transparent;
    }
    & div:nth-child(1) {
      animation-delay: -0.45s;
    }
    & div:nth-child(2) {
      animation-delay: -0.3s;
    }
    & div:nth-child(3) {
      animation-delay: -0.15s;
    }
    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `
  /* stylelint-enable */
};

export default Style;
