import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { getSpacing } from 'stylesheet';
import { Container, LighthouseLink, LighthouseNote, SubTitle } from './LighthouseBlock.style';
import LighthouseScore from './LighthouseScore';

export interface OwnProps {
  lighthouseUrl: string;
  lighthouseScore: number;
}

const LighthouseBlock: React.FunctionComponent<OwnProps> = ({ lighthouseUrl, lighthouseScore }) => {
  return (
    <Container>
      <SubTitle margin={`0 0 ${getSpacing(5)} 0}`}>
        <FormattedMessage id="Audits.lighthouse_report" />
      </SubTitle>
      <LighthouseNote margin={`0 0 ${getSpacing(4)} 0}`}>
        <FormattedMessage id="Audits.lighthouse_note" />
      </LighthouseNote>
      <LighthouseScore score={lighthouseScore}/>
    </Container>
  );
};

export default LighthouseBlock;
