import React, { FunctionComponent as FC } from 'react';
import { Route, match as matchType, Redirect } from 'react-router-dom';

import ProjectIndex from './project_index';
import ProjectItem from './project_item';

import { hooks, store } from '@src/store/root_state';

interface ProjectProps {
  match: matchType<{ slug: string; }>;
  projectIndex: typeof store.projectStore.projectIndex;
  projects: typeof store.projectStore.projects;
  refresh: () => void;
}

const ProjectPage: FC<ProjectProps> = ({ match, projects, projectIndex, refresh }) => (
  <>
    <Route exact path={`${match.path}`} render={() => {
      if (projectIndex.length === 0) {
        hooks.fetchProjects().then(refresh);
      }
      return (
        <ProjectIndex index={projectIndex} />
      );
    }} />
    <Route path={`${match.path}/:slug`} render={({ match: { params } }) => {
      const { slug } = params;
      const project = projects[slug];
      console.log(project);
      if (project === null) {
        return (<Redirect to='/projects' />);
      }

      if (project === undefined) {
        hooks.fetchProject(slug).then(refresh);
      }
      return (
        <ProjectItem project={project} />
      );
    }} />
  </>
);

export default ProjectPage;
