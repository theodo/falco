import React from 'react';

import { FormattedMessage, injectIntl } from 'react-intl';
import { NotFoundButton, NotFoundContainer, NotFoundInsideContainer, NotFoundSubTitle, NotFoundTitle } from './NotFoundComponent.style';

const NotFoundComponent: React.FunctionComponent<any> = () => (
    <NotFoundContainer>
        <NotFoundInsideContainer>
            <NotFoundTitle>
                <FormattedMessage id="notFound.404Title" />
            </NotFoundTitle>
            <NotFoundSubTitle>
                <FormattedMessage id="notFound.404Subtitle" />
            </NotFoundSubTitle>
            <NotFoundButton href="/">
                <FormattedMessage id="notFound.404Button" />
            </NotFoundButton>
        </NotFoundInsideContainer>
    </NotFoundContainer>
);

export default injectIntl(NotFoundComponent);
