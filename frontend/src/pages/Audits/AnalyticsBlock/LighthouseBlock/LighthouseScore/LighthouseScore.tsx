import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { colorUsage } from 'stylesheet';
import {
  Container,
  GaugeArc,
  GaugeBase,
  GaugeLabel,
  GaugePercentage,
  GaugeSvg,
  GaugeSvgWrapper,
  GaugeWrapper,
  ScoreGauge,
} from './LighthouseScore.style';

export interface OwnProps {
  score: number;
}

export const LIGHTHOUSE_FAIL_SCORE_THRESHOLD = 0;
export const LIGHTHOUSE_AVERAGE_SCORE_THRESHOLD = 0.5;
export const LIGHTHOUSE_PASS_SCORE_THRESHOLD = 0.9;

const LighthouseScore: React.FunctionComponent<OwnProps> = ({ score }) => {
  const color =
    score < LIGHTHOUSE_AVERAGE_SCORE_THRESHOLD
      ? colorUsage.lighthouseFail
      : score < LIGHTHOUSE_PASS_SCORE_THRESHOLD
      ? colorUsage.lighthouseAverage
      : colorUsage.lighthousePass;

  return (
    <Container>
      <ScoreGauge>
        <GaugeWrapper scoreColor={color}>
          <GaugeSvgWrapper>
            <GaugeSvg viewBox="0 0 120 120">
              <GaugeBase r="56" cx="60" cy="60" scoreColor={color} />

              <GaugeArc
                transform="rotate(-90 60 60)"
                r="56"
                cx="60"
                cy="60"
                scoreColor={color}
                score={score}
              />
            </GaugeSvg>
          </GaugeSvgWrapper>
          <GaugePercentage>{Math.round(score * 100)}</GaugePercentage>
          <GaugeLabel>
            <FormattedMessage id="Audits.lighthouse_performance" />
          </GaugeLabel>
        </GaugeWrapper>
      </ScoreGauge>
    </Container>
  );
};

export default LighthouseScore;
