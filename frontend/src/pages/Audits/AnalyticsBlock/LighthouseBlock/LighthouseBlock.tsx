import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { getSpacing } from 'stylesheet';
import { Container, LighthouseFrame, LighthouseNote, SubTitle } from './LighthouseBlock.style';

export interface OwnProps {
  lighthouseUrl: string;
}

const LighthouseBlock: React.FunctionComponent<OwnProps> = ({ lighthouseUrl }) => {
  return (
    <Container>
      <SubTitle margin={`0 0 ${getSpacing(5)} 0}`}>
        <FormattedMessage id="Audits.lighthouse_report" />
      </SubTitle>
      <LighthouseNote margin={`0 0 ${getSpacing(4)} 0}`}>
        <FormattedMessage id="Audits.lighthouse_note" />
      </LighthouseNote>
      <LighthouseFrame src={lighthouseUrl}/>
    </Container>
  );
};

export default LighthouseBlock;
