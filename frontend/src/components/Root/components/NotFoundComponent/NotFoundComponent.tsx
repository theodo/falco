import React from 'react';

import { NotFoundButton, NotFoundContainer, NotFoundInsideContainer, NotFoundSubTitle, NotFoundTitle } from './NotFoundComponent.style';

const NotFoundComponent: React.FunctionComponent<any> = () => (
    <NotFoundContainer>
        <NotFoundInsideContainer>
            <NotFoundTitle>404 Not Found</NotFoundTitle>
            <NotFoundSubTitle>Sorry, this page does not exist</NotFoundSubTitle>
            <NotFoundButton href="/">Back to homepage</NotFoundButton>
        </NotFoundInsideContainer>
    </NotFoundContainer>
);

export default NotFoundComponent;
