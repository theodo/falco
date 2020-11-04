import styled from 'styled-components';

interface ItemWithMarginProps {
  margin?: string;
}

export const Container = styled.div`
  margin: ${(props: ItemWithMarginProps) => (props.margin ? props.margin : '0')};
  width: 100%;
  display: flex;
  flex-direction: column;
`;
