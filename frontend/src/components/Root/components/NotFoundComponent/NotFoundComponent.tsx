import React from 'react';

import { FormattedMessage } from 'react-intl';
import {
  NotFoundButton,
  NotFoundContainer,
  NotFoundInsideContainer,
  NotFoundSubTitle,
  NotFoundTitle,
} from './NotFoundComponent.style';

const NotFoundComponent: React.FunctionComponent = () => (
  <NotFoundContainer>
    <NotFoundInsideContainer>
      <NotFoundTitle>
        <FormattedMessage id="NotFound.title" />
      </NotFoundTitle>
      <NotFoundSubTitle>
        <FormattedMessage id="NotFound.subtitle" />
      </NotFoundSubTitle>
      <NotFoundButton href="/">
        <FormattedMessage id="NotFound.button" />
      </NotFoundButton>
    </NotFoundInsideContainer>
  </NotFoundContainer>
);

export default NotFoundComponent;
