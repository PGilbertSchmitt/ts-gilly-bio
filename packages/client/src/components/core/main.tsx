import React, { FunctionComponent as FC } from 'react';
import { Route } from 'react-router-dom';

import { AppProps } from '@comp/core/root';
import PageBase from '@comp/core/page_base';
import HomePage from '@comp/content/home_page';
import BlogPage from '@comp/content/blog_page';
import ProjectPage from '@comp/content/projects/project_page';

const Main: FC<AppProps> = ({ store }) => (
  <PageBase>
    <Route path='/' exact render={() => (
      <HomePage />
    )} />
    <Route path='/projects' render={({ match }) => (
      <ProjectPage
        {...store.projectStore}
        match={match} />
    )} />
    <Route path='/blog' render={() => (
      <BlogPage />
    )} />
  </PageBase>
);

export default Main;
