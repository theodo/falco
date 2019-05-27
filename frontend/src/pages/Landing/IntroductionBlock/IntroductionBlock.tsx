import LandingBlock from 'components/LandingBlock';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import FalcoDashboardImage from 'static/images/FalcoDashboard.png';
import LeadForm from '../LeadForm';
import Style from './IntroductionBlock.style';

interface Props {
  backgroundColor?: string;
}

const IntroductionBlock: React.FunctionComponent<Props> = ({ backgroundColor }) => {
  return (
    <LandingBlock backgroundColor={backgroundColor}>
      <Style.IntroductionBlockContainer>
        <Style.IntroductionBlockColumn>
          <Style.IntroductionBlockPitch>
            <Style.IntroductionBlockTitle>
              <FormattedMessage id="Landing.introduction_block.title" />
            </Style.IntroductionBlockTitle>
            <Style.Introduction>
              <FormattedMessage id="Landing.introduction_block.introduction" />
            </Style.Introduction>
          </Style.IntroductionBlockPitch>
          <LeadForm />
        </Style.IntroductionBlockColumn>
        <Style.FalcoIllustration src={FalcoDashboardImage} />
      </Style.IntroductionBlockContainer>
    </LandingBlock>
  );
};

export default IntroductionBlock;
