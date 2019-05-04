import React, { FunctionComponent as FC } from 'react';
import { Route } from 'react-router-dom';

import PageBase from '@comp/core/page_base';
import HomePage from '@comp/content/home_page';
import BlogPage from '@comp/content/blog_page';
import ProjectPage from '@comp/content/projects/project_page';

const Main: FC = () => (
  <PageBase>
    <Route path='/' component={HomePage} exact />
    <Route path='/projects' component={ProjectPage} />
    <Route path='/blog' component={BlogPage} />
  </PageBase>
);

export default Main;
