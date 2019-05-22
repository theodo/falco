import LandingBlock from 'components/LandingBlock';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import FalcoAnalysisImage from 'static/images/FalcoAnalysis.svg';
import FalcoMonitoringImage from 'static/images/FalcoMonitoring.svg';
import FalcoOptimisationImage from 'static/images/FalcoOptimisation.svg';
import { getSpacing } from 'stylesheet';
import Style from './FeaturesBlock.style';

interface Props {
  backgroundColor?: string;
}

const FeaturesBlock: React.FunctionComponent<Props> = ({ backgroundColor }) => {
  return (
    <LandingBlock backgroundColor={backgroundColor}>
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
  );
};

export default FeaturesBlock;
