import React, { FunctionComponent as FC } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';

import ProjectIndex from './project_index';

const ProjectPage: FC<RouteComponentProps> = ({ match }) => (
  <>
    <Route exact path={`${match.url}`} component={ProjectIndex} />
    <Route path={`${match.url}/:slug`} render={(props) => (
      <h3>We are looking at {props.match.url}</h3>
    )} />
  </>
);

export default ProjectPage;
