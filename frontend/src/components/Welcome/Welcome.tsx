import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';
import {
  WelcomeBlockContainer,
  WelcomeBlockText,
  WelcomeBlockTextParagraph,
  WelcomeBlockTitle,
} from './Welcome.style';

type Props = {} & InjectedIntlProps;

const Welcome: React.FunctionComponent<Props> = () => {
  return (
    <WelcomeBlockContainer>
      <WelcomeBlockTitle>
        <FormattedMessage id="Welcome.title" />
      </WelcomeBlockTitle>
      <WelcomeBlockText>
        <WelcomeBlockTextParagraph>
          <FormattedMessage id="Welcome.no_project" />
        </WelcomeBlockTextParagraph>
        <WelcomeBlockTextParagraph>
          <FormattedMessage id="Welcome.create_project" />
        </WelcomeBlockTextParagraph>
        <WelcomeBlockTextParagraph>
          <FormattedMessage id="Welcome.join_project" />
        </WelcomeBlockTextParagraph>
      </WelcomeBlockText>
    </WelcomeBlockContainer>
  );
};

export default Welcome;
