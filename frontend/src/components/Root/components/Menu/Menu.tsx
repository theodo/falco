import React from 'react';

import Style from './Menu.style';

// Your component own properties
interface Props {
  [n: string]: never;
}

const Menu: React.FunctionComponent<Props> = () => <Style.Menu>Menu</Style.Menu>;

export default Menu;
