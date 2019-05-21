import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router';

import LandingBlock from 'components/LandingBlock';
import { routeDefinitions } from 'routes';
import FalcoAnalysisImage from 'static/images/FalcoAnalysis.svg';
import FalcoDashboardImage from 'static/images/FalcoDashboard.jpg';
import FalcoMonitoringImage from 'static/images/FalcoMonitoring.svg';
import FalcoOptimisationImage from 'static/images/FalcoOptimisation.svg';
import LogoBNP from 'static/images/LogoBNP.png';
import LogoChooseMyCompany from 'static/images/LogoChooseMyCompany.png';
import LogoTarkett from 'static/images/LogoTarkett.png';
import LogoVoodoo from 'static/images/LogoVoodoo.png';
import LogoTheodo from 'static/images/TheodoLogo.svg';
import { colorUsage, getSpacing } from 'stylesheet';
import Style from './Landing.style';
import LeadForm from './LeadForm';

interface Props {
  isUserAuthenticated: boolean;
}

export const Landing: React.FunctionComponent<Props> = props => {
  if (props.isUserAuthenticated) {
    return <Redirect to={routeDefinitions.projectsList.path} />;
  }

  return (
    <React.Fragment>
      <LandingBlock>
        <Style.IntroductionBlockContainer>
          <Style.IntroductionBlockColumn>
            <Style.IntroductionBlockTitle>
              <FormattedMessage id="Landing.introduction_block.title" />
            </Style.IntroductionBlockTitle>
            <Style.Introduction>
              <FormattedMessage id="Landing.introduction_block.introduction" />
            </Style.Introduction>
            <LeadForm />
          </Style.IntroductionBlockColumn>
          <Style.IntroductionBlockColumn>
            <Style.FalcoIllustration src={FalcoDashboardImage} />
          </Style.IntroductionBlockColumn>
        </Style.IntroductionBlockContainer>
      </LandingBlock>
      <LandingBlock backgroundColor={colorUsage.landingPageGlobalBackground}>
        <Style.CustomersBlockContainer>
          <Style.CustomersBlockTitle>
            <FormattedMessage id={'Landing.customers_block.title'} />
          </Style.CustomersBlockTitle>
          <Style.CustomersBlockLogosContainer>
            <Style.CustomersBlockLogo src={LogoBNP} height={'40px'} />
            <Style.CustomersBlockLogo src={LogoChooseMyCompany} height={'40px'} />
            <Style.CustomersBlockLogo src={LogoTarkett} height={'40px'} />
            <Style.CustomersBlockLogo src={LogoVoodoo} height={'40px'} />
          </Style.CustomersBlockLogosContainer>
        </Style.CustomersBlockContainer>
      </LandingBlock>
      <LandingBlock>
        <Style.FeaturesBlockContainer>
          <Style.FeaturesBlockColumn margin={`0 ${getSpacing(4)} 0 0`}>
            <Style.FeaturesBlockTitle>
              <FormattedMessage id="Landing.features_block.monitoring.title" />
            </Style.FeaturesBlockTitle>
            <Style.FunctionalIllustration src={FalcoMonitoringImage} />
            <Style.Description>
              <FormattedMessage id="Landing.features_block.monitoring.description" />
            </Style.Description>
          </Style.FeaturesBlockColumn>
          <Style.FeaturesBlockColumn margin={`0 ${getSpacing(4)} 0 0`}>
            <Style.FeaturesBlockTitle>
              <FormattedMessage id="Landing.features_block.analysis.title" />
            </Style.FeaturesBlockTitle>
            <Style.FunctionalIllustration src={FalcoAnalysisImage} />
            <Style.Description>
              <FormattedMessage id="Landing.features_block.analysis.description" />
            </Style.Description>
          </Style.FeaturesBlockColumn>
          <Style.FeaturesBlockColumn>
            <Style.FeaturesBlockTitle>
              <FormattedMessage id="Landing.features_block.optimisation.title" />
            </Style.FeaturesBlockTitle>
            <Style.FunctionalIllustration src={FalcoOptimisationImage} />
            <Style.Description>
              <FormattedMessage id="Landing.features_block.optimisation.description" />
            </Style.Description>
          </Style.FeaturesBlockColumn>
        </Style.FeaturesBlockContainer>
      </LandingBlock>
      <LandingBlock backgroundColor={colorUsage.landingPageGlobalBackground}>
        <Style.FAQBlockContainer>
          <Style.FAQBlockTitle>
            <FormattedMessage id={'Landing.faq_block.title'} />
          </Style.FAQBlockTitle>
          <Style.FAQBlockColumnsContainer>
            <Style.FAQBlockColumn margin={`0 ${getSpacing(30)} 0 0 `}>
              <Style.FAQBlock margin={`0 0 ${getSpacing(4)} 0`}>
                <Style.FAQQuestion>
                  <FormattedMessage id={'Landing.faq_block.1st_question'} />
                </Style.FAQQuestion>
                <Style.FAQAnswer>
                  <FormattedMessage id={'Landing.faq_block.1st_answer'} />
                </Style.FAQAnswer>
              </Style.FAQBlock>
              <Style.FAQBlock>
                <Style.FAQQuestion>
                  <FormattedMessage id={'Landing.faq_block.2nd_question'} />
                </Style.FAQQuestion>
                <Style.FAQAnswer>
                  <FormattedMessage id={'Landing.faq_block.2nd_answer'} />
                </Style.FAQAnswer>
              </Style.FAQBlock>
            </Style.FAQBlockColumn>
            <Style.FAQBlockColumn margin={`0 0 0 ${getSpacing(30)}`}>
              <Style.FAQBlock margin={`0 0 ${getSpacing(4)} 0`}>
                <Style.FAQQuestion>
                  <FormattedMessage id={'Landing.faq_block.3rd_question'} />
                </Style.FAQQuestion>
                <Style.FAQAnswer>
                  <FormattedMessage id={'Landing.faq_block.3rd_answer'} />
                </Style.FAQAnswer>
              </Style.FAQBlock>
              <Style.FAQBlock>
                <Style.FAQQuestion>
                  <FormattedMessage id={'Landing.faq_block.4th_question'} />
                </Style.FAQQuestion>
                <Style.FAQAnswer>
                  <FormattedMessage
                    id="Landing.faq_block.4th_answer"
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
            </Style.FAQBlockColumn>
          </Style.FAQBlockColumnsContainer>
        </Style.FAQBlockContainer>
      </LandingBlock>
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
