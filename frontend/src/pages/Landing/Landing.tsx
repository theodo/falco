import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router';

import LandingBlock from 'components/LandingBlock';
import { routeDefinitions } from 'routes';
import FalcoDashboardImage from 'static/images/FalcoDashboard.png';
import Style from './Landing.style';

interface Props {
  isUserAuthenticated: boolean;
}

const Landing: React.FunctionComponent<Props> = props => {
  if (props.isUserAuthenticated) {
    return <Redirect to={routeDefinitions.projectsList.path} />;
  }

  return (
    <React.Fragment>
      <LandingBlock>
        <Style.FirstBlockContainer>
          <Style.FirstBlockColumn>
            <Style.Title>
              <FormattedMessage id="home.first_block.title" />
            </Style.Title>
            <Style.Introduction>
              <FormattedMessage id="home.first_block.introduction" />
            </Style.Introduction>
          </Style.FirstBlockColumn>
          <Style.FirstBlockColumn>
            <Style.FalcoIllustration src={FalcoDashboardImage} />
          </Style.FirstBlockColumn>
        </Style.FirstBlockContainer>
      </LandingBlock>
    </React.Fragment>
  );
};

export default Landing;
