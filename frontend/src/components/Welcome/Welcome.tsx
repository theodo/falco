import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  WelcomeBlockContainer,
  WelcomeBlockText,
  WelcomeBlockTextParagraph,
  WelcomeBlockTitle,
} from './Welcome.style';
import { DOCUMENTATION_ROOT } from 'services/constants';

const documentationPath = `${DOCUMENTATION_ROOT}/docs/getting-started/configuring-your-first-project`;

const Welcome: React.FunctionComponent = () => {
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
          <FormattedMessage
            id="Welcome.create_project"
            values={{
              link: (
                <a href={documentationPath} target="_blank" rel="noreferrer noopener">
                  {documentationPath}
                </a>
              ),
            }}
          />
        </WelcomeBlockTextParagraph>
        <WelcomeBlockTextParagraph>
          <FormattedMessage id="Welcome.join_project" />
        </WelcomeBlockTextParagraph>
      </WelcomeBlockText>
    </WelcomeBlockContainer>
  );
};

export default Welcome;
