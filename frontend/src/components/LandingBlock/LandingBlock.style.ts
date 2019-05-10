import styled from 'styled-components';

interface Props {
  backgroundColor?: string;
}

const Style = {
  LoaderContainer: styled.div`
    display: flex;
    justify-content: center;
    width: 1240px;
    background-color: ${(props: Props) => props.backgroundColor || 'transparent'};
    padding: 0 100px;
  `,
};

export default Style;
