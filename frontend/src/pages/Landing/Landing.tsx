import * as React from 'react';
import { Redirect } from 'react-router';

import { routeDefinitions } from 'routes';
import { colorUsage } from 'stylesheet';
import CustomersBlock from './CustomersBlock';
import FAQBlock from './FAQBlock';
import FeaturesBlock from './FeaturesBlock';
import Footer from './Footer';
import IntroductionBlock from './IntroductionBlock';

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
      <Footer />
    </React.Fragment>
  );
};
