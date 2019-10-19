import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import Style from './Welcome.style';

type Props = {
} & InjectedIntlProps;

const Welcome: React.FunctionComponent<Props> = () => {
    return (
      <Style.WelcomeBlockContainer>
        <Style.WelcomeBlockTitle>
          <FormattedMessage id="Welcome.title"/>
        </Style.WelcomeBlockTitle>
        <Style.WelcomeBlockText>
          <Style.WelcomeBlockTextParagraph>
            <FormattedMessage id="Welcome.no_project"/>
          </Style.WelcomeBlockTextParagraph>
          <Style.WelcomeBlockTextParagraph>
            <FormattedMessage id="Welcome.create_project"/>
          </Style.WelcomeBlockTextParagraph>
          <Style.WelcomeBlockTextParagraph>
            <FormattedMessage id="Welcome.join_project"/>
          </Style.WelcomeBlockTextParagraph>
        </Style.WelcomeBlockText>
      </Style.WelcomeBlockContainer>
    )
};

export default Welcome;
