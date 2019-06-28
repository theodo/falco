import LandingBlock from 'components/LandingBlock';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import FalcoAnalysisImage from 'static/images/FalcoAnalysis.svg';
import FalcoMonitoringImage from 'static/images/FalcoMonitoring.svg';
import FalcoOptimisationImage from 'static/images/FalcoOptimisation.svg';
import Style from './FeaturesBlock.style';

interface Props {
  backgroundColor?: string;
}

const FeaturesBlock: React.FunctionComponent<Props> = ({ backgroundColor }) => {
  return (
    <LandingBlock backgroundColor={backgroundColor}>
      <Style.FeaturesBlockContainer>
        <Style.FeaturesBlockTitle>
          <FormattedMessage id={'Landing.features_block.title'} />
        </Style.FeaturesBlockTitle>
        <Style.FeaturesContainer>
          <Style.FeatureContainer>
            <Style.FeatureTitle>
              <FormattedMessage id="Landing.features_block.monitoring.title" />
            </Style.FeatureTitle>
            <Style.FeatureIllustration src={FalcoMonitoringImage} />
            <Style.FeatureDescription>
              <FormattedMessage id="Landing.features_block.monitoring.description" />
            </Style.FeatureDescription>
          </Style.FeatureContainer>
          <Style.FeatureContainer>
            <Style.FeatureTitle>
              <FormattedMessage id="Landing.features_block.analysis.title" />
            </Style.FeatureTitle>
            <Style.FeatureIllustration src={FalcoAnalysisImage} />
            <Style.FeatureDescription>
              <FormattedMessage id="Landing.features_block.analysis.description" />
            </Style.FeatureDescription>
          </Style.FeatureContainer>
          <Style.FeatureContainer>
            <Style.FeatureTitle>
              <FormattedMessage id="Landing.features_block.optimisation.title" />
            </Style.FeatureTitle>
            <Style.FeatureIllustration src={FalcoOptimisationImage} />
            <Style.FeatureDescription>
              <FormattedMessage id="Landing.features_block.optimisation.description" />
            </Style.FeatureDescription>
          </Style.FeatureContainer>
        </Style.FeaturesContainer>
      </Style.FeaturesBlockContainer>
    </LandingBlock>
  );
};

export default FeaturesBlock;
