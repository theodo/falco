import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router';

import LandingBlock from 'components/LandingBlock';
import { routeDefinitions } from 'routes';
import FalcoAnalysisImage from 'static/images/FalcoAnalysis.svg';
import FalcoDashboardImage from 'static/images/FalcoDashboard.jpg';
import FalcoMonitoringImage from 'static/images/FalcoMonitoring.svg';
import FalcoOptimisationImage from 'static/images/FalcoOptimisation.svg';
import { colorUsage, getSpacing } from 'stylesheet';
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
              <FormattedMessage id="Landing.first_block.title" />
            </Style.Title>
            <Style.Introduction>
              <FormattedMessage id="Landing.first_block.introduction" />
            </Style.Introduction>
          </Style.FirstBlockColumn>
          <Style.FirstBlockColumn>
            <Style.FalcoIllustration src={FalcoDashboardImage} />
          </Style.FirstBlockColumn>
        </Style.FirstBlockContainer>
      </LandingBlock>
      <LandingBlock backgroundColor={colorUsage.landingPageGlobalBackground}>
        <Style.SecondBlockContainer>
          <Style.SecondBlockColumn margin={`0 ${getSpacing(4)} 0 0`}>
            <Style.SubTitle>
              <FormattedMessage id="Landing.second_block.monitoring.title" />
            </Style.SubTitle>
            <Style.FunctionalIllustration src={FalcoMonitoringImage} />
            <Style.Description>
              <FormattedMessage id="Landing.second_block.monitoring.description" />
            </Style.Description>
          </Style.SecondBlockColumn>
          <Style.SecondBlockColumn margin={`0 ${getSpacing(4)} 0 0`}>
            <Style.SubTitle>
              <FormattedMessage id="Landing.second_block.analysis.title" />
            </Style.SubTitle>
            <Style.FunctionalIllustration src={FalcoAnalysisImage} />
            <Style.Description>
              <FormattedMessage id="Landing.second_block.analysis.description" />
            </Style.Description>
          </Style.SecondBlockColumn>
          <Style.SecondBlockColumn>
            <Style.SubTitle>
              <FormattedMessage id="Landing.second_block.optimisation.title" />
            </Style.SubTitle>
            <Style.FunctionalIllustration src={FalcoOptimisationImage} />
            <Style.Description>
              <FormattedMessage id="Landing.second_block.optimisation.description" />
            </Style.Description>
          </Style.SecondBlockColumn>
        </Style.SecondBlockContainer>
      </LandingBlock>
    </React.Fragment>
  );
};

export default Landing;
