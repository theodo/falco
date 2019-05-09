import * as React from 'react';
import { Redirect } from 'react-router';

import Typography from '@material-ui/core/Typography';

import { routeDefinitions } from 'routes';

interface Props {
  isUserAuthenticated: boolean;
}

const Landing: React.FunctionComponent<Props> = props => {
  if (props.isUserAuthenticated) {
    return <Redirect to={routeDefinitions.projectsList.path} />;
  }

  return (
    <React.Fragment>
      <Typography variant="subtitle1" gutterBottom>
        Welcome to my landing page :)
      </Typography>
    </React.Fragment>
  );
};

export default Landing;
