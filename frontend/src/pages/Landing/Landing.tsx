import * as React from 'react';
import { Redirect } from 'react-router';

import LandingBlock from 'components/LandingBlock';
import { routeDefinitions } from 'routes';
import LogoTheodo from 'static/images/TheodoLogo.svg';
import { colorUsage } from 'stylesheet';
import CustomersBlock from './CustomersBlock';
import FAQBlock from './FAQBlock';
import FeaturesBlock from './FeaturesBlock';
import IntroductionBlock from './IntroductionBlock';
import Style from './Landing.style';

interface Props {
  isUserAuthenticated: boolean;
}

export const Landing: React.FunctionComponent<Props> = props => {
  if (props.isUserAuthenticated) {
    return <Redirect to={routeDefinitions.projectsList.path} />;
  }

  return (
    <React.Fragment>
      <IntroductionBlock />
      <CustomersBlock backgroundColor={colorUsage.landingPageGlobalBackground} />
      <FeaturesBlock />
      <FAQBlock backgroundColor={colorUsage.landingPageGlobalBackground} />
      <LandingBlock>
        <Style.FooterContainer>
          <Style.TheodoLogoLink href={'https://www.theodo.fr'} target={'_blank'}>
            <Style.TheodoLogo src={LogoTheodo} />
          </Style.TheodoLogoLink>
        </Style.FooterContainer>
      </LandingBlock>
    </React.Fragment>
  );
};
