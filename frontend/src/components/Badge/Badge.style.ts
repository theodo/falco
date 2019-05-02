import styled from 'styled-components';
import { fontFamily, fontSize, fontWeight, getSpacing, lineHeight } from 'stylesheet';

interface Props {
  backgroundColor: string;
  color: string;
  margin?: string;
}

const StyledBadge = {
  Badge: styled.span`
    text-align: center;
    padding: ${getSpacing(1)} ${getSpacing(2)};
    margin: ${props => (props.margin ? props.margin : '0')};
    color: ${props => props.color};
    font-family: ${fontFamily.mainSans};
    line-height: ${lineHeight.badgeText};
    font-size: ${fontSize.badgeText};
    font-weight: ${fontWeight.badgeText};
    border-radius: 8px;
    background-color: ${(props: Props) => props.backgroundColor};
  `,
};

export default StyledBadge;
