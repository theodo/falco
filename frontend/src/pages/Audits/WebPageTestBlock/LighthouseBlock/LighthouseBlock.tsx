import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { getSpacing } from 'stylesheet';
import Style from './LighthouseBlock.style';

export interface OwnProps {
  lighthouseUrl: string;
}

const LighthouseBlock: React.FunctionComponent<OwnProps> = ({ lighthouseUrl }) => {
  return (
    <Style.Container>
      <Style.SubTitle margin={`0 0 ${getSpacing(5)} 0}`}>
        <FormattedMessage id="Audits.lighthouse_report" />
      </Style.SubTitle>
      <Style.LighthouseNote margin={`0 0 ${getSpacing(4)} 0}`}>
        <FormattedMessage id="Audits.lighthouse_note" />
      </Style.LighthouseNote>
      <Style.LighthouseFrame src={lighthouseUrl} />
    </Style.Container>
  );
};

export default LighthouseBlock;
