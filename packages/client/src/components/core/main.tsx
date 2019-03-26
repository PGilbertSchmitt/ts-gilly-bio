import React, { SFC } from 'react';
import { Route } from 'react-router-dom';

const Home: SFC = () => (
  <div>
    This is my home!
  </div>
);

const Projects: SFC = () => (
  <div>
    These are my projects!

    <ul>
      <li>Fake!</li>
      <li>Made up!</li>
      <li>Untrue!</li>
    </ul>
  </div>
);

const Blog: SFC = () => (
  <div>
    This is my blog!
  </div>
);

const Main: SFC = () => (
  <div>
    <Route path='/' component={Home} exact />
    <Route path='/projects' component={Projects} />
    <Route path='/blog' component={Blog} />
  </div>
);

export default Main;
