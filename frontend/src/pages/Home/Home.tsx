import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';

import StyledIntro from './Home.style';

const Home: React.SFC = () => (
  <React.Fragment>
    <StyledIntro>
      <Typography variant="subtitle1" gutterBottom>
        <FormattedMessage id="home.welcome" defaultMessage="Welcome to Falco!" />
      </Typography>
    </StyledIntro>
  </React.Fragment>
);

export default Home;
