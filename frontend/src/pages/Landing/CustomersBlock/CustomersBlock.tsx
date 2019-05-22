import LandingBlock from 'components/LandingBlock';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import LogoBNP from 'static/images/LogoBNP.png';
import LogoChooseMyCompany from 'static/images/LogoChooseMyCompany.png';
import LogoTarkett from 'static/images/LogoTarkett.png';
import LogoVoodoo from 'static/images/LogoVoodoo.png';
import Style from './CustomersBlock.style';

interface Props {
  backgroundColor?: string;
}

const CustomersBlock: React.FunctionComponent<Props> = ({ backgroundColor }) => {
  const customerLogoHeight = '40px';
  return (
    <LandingBlock backgroundColor={backgroundColor}>
      <Style.CustomersBlockContainer>
        <Style.CustomersBlockTitle>
          <FormattedMessage id={'Landing.customers_block.title'} />
        </Style.CustomersBlockTitle>
        <Style.CustomersBlockLogosContainer>
          <Style.CustomersBlockLogo src={LogoBNP} height={customerLogoHeight} />
          <Style.CustomersBlockLogo src={LogoChooseMyCompany} height={customerLogoHeight} />
          <Style.CustomersBlockLogo src={LogoTarkett} height={customerLogoHeight} />
          <Style.CustomersBlockLogo src={LogoVoodoo} height={customerLogoHeight} />
        </Style.CustomersBlockLogosContainer>
      </Style.CustomersBlockContainer>
    </LandingBlock>
  );
};

export default CustomersBlock;
