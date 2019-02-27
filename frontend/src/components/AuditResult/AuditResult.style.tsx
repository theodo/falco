import styled from 'styled-components';

const Style = {
  Container: styled.div`
    border: solid 2px #374894;
    border-radius: 5px;
    margin: 10px 0;
    padding: 5px;
    color: ${({ isOk }: { isOk: boolean }) => (isOk ? '#08A491' : '#EA7272')};
  `,
};

export default Style;
