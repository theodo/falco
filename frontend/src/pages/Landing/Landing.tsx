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
            <Style.FirstBlockTitle>
              <FormattedMessage id="Landing.first_block.title" />
            </Style.FirstBlockTitle>
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
            <Style.SecondBlockTitle>
              <FormattedMessage id="Landing.second_block.monitoring.title" />
            </Style.SecondBlockTitle>
            <Style.FunctionalIllustration src={FalcoMonitoringImage} />
            <Style.Description>
              <FormattedMessage id="Landing.second_block.monitoring.description" />
            </Style.Description>
          </Style.SecondBlockColumn>
          <Style.SecondBlockColumn margin={`0 ${getSpacing(4)} 0 0`}>
            <Style.SecondBlockTitle>
              <FormattedMessage id="Landing.second_block.analysis.title" />
            </Style.SecondBlockTitle>
            <Style.FunctionalIllustration src={FalcoAnalysisImage} />
            <Style.Description>
              <FormattedMessage id="Landing.second_block.analysis.description" />
            </Style.Description>
          </Style.SecondBlockColumn>
          <Style.SecondBlockColumn>
            <Style.SecondBlockTitle>
              <FormattedMessage id="Landing.second_block.optimisation.title" />
            </Style.SecondBlockTitle>
            <Style.FunctionalIllustration src={FalcoOptimisationImage} />
            <Style.Description>
              <FormattedMessage id="Landing.second_block.optimisation.description" />
            </Style.Description>
          </Style.SecondBlockColumn>
        </Style.SecondBlockContainer>
      </LandingBlock>
      <LandingBlock>
        <Style.ThirdBlockContainer>
          <Style.ThirdBlockTitle>
            <FormattedMessage id={'Landing.third_block.title'} />
          </Style.ThirdBlockTitle>
          <Style.ThirdBlockColumnsContainer>
            <Style.ThirdBlockColumn margin={`0 ${getSpacing(30)} 0 0 `}>
              <Style.FAQBlock margin={`0 0 ${getSpacing(4)} 0`}>
                <Style.FAQQuestion>
                  <FormattedMessage id={'Landing.third_block.1st_question'} />
                </Style.FAQQuestion>
                <Style.FAQAnswer>
                  <FormattedMessage id={'Landing.third_block.1st_answer'} />
                </Style.FAQAnswer>
              </Style.FAQBlock>
              <Style.FAQBlock>
                <Style.FAQQuestion>
                  <FormattedMessage id={'Landing.third_block.2nd_question'} />
                </Style.FAQQuestion>
                <Style.FAQAnswer>
                  <FormattedMessage id={'Landing.third_block.2nd_answer'} />
                </Style.FAQAnswer>
              </Style.FAQBlock>
            </Style.ThirdBlockColumn>
            <Style.ThirdBlockColumn margin={`0 0 0 ${getSpacing(30)}`}>
              <Style.FAQBlock margin={`0 0 ${getSpacing(4)} 0`}>
                <Style.FAQQuestion>
                  <FormattedMessage id={'Landing.third_block.3rd_question'} />
                </Style.FAQQuestion>
                <Style.FAQAnswer>
                  <FormattedMessage id={'Landing.third_block.3rd_answer'} />
                </Style.FAQAnswer>
              </Style.FAQBlock>
              <Style.FAQBlock>
                <Style.FAQQuestion>
                  <FormattedMessage id={'Landing.third_block.4th_question'} />
                </Style.FAQQuestion>
                <Style.FAQAnswer>
                  <FormattedMessage
                    id="Landing.third_block.4th_answer"
                    values={{
                      theodoLink: (
                        <Style.TheodoLink href="https://www.theodo.fr" target="_blank">
                          Theodo
                        </Style.TheodoLink>
                      ),
                    }}
                  />
                </Style.FAQAnswer>
              </Style.FAQBlock>
            </Style.ThirdBlockColumn>
          </Style.ThirdBlockColumnsContainer>
        </Style.ThirdBlockContainer>
      </LandingBlock>
    </React.Fragment>
  );
};

export default Landing;
