import styled from 'styled-components';

import { responsiveThreshold } from 'stylesheet';

interface Props {
  backgroundColor?: string;
}

const Style = {
  LandingBlockContainer: styled.div`
    display: flex;
    justify-content: center;
    width: 1240px;
    background-color: ${(props: Props) => props.backgroundColor || 'transparent'};
    padding: 0 100px;

    @media only screen and (max-width: ${responsiveThreshold}) {
      width: 100%;
      padding: 0;
    }
  `,
};

export default Style;
