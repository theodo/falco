import * as React from 'react';
import { Redirect } from 'react-router';

import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';

import StyledIntro from './Home.style';

interface Props {
  isUserAuthenticated: boolean;
}

const Home: React.FunctionComponent<Props> = props => {
  if (props.isUserAuthenticated) {
    return <Redirect to="/projects" />;
  }

  return (
    <React.Fragment>
      <StyledIntro>
        <Typography variant="subtitle1" gutterBottom>
          <FormattedMessage id="home.welcome" defaultMessage="Welcome to Falco!" />
        </Typography>
      </StyledIntro>
    </React.Fragment>
  );
};

export default Home;
