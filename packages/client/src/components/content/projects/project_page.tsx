import React, { FunctionComponent as FC } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import ProjectIndex from './project_index';
import ProjectItem from './project_item';

const ProjectPage: FC<RouteComponentProps> = ({ match }) => (
  <>
    <Route exact path={`${match.path}`} component={ProjectIndex} />
    <Route path={`${match.path}/:slug`} component={ProjectItem} />
  </>
);

export default ProjectPage;
