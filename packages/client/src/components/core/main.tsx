import React, { FunctionComponent as FC } from 'react';
import { Route } from 'react-router-dom';

const Home: FC = () => (
  <div>
    This is my home!
  </div>
);

const Projects: FC = () => (
  <div>
    These are my projects!

    <ul>
      <li>Fake!</li>
      <li>Made up!</li>
      <li>Untrue!</li>
    </ul>
  </div>
);

const Blog: FC = () => (
  <div>
    This is my blog!
  </div>
);

const Main: FC = () => (
  <div>
    <Route path='/' component={Home} exact />
    <Route path='/projects' component={Projects} />
    <Route path='/blog' component={Blog} />
  </div>
);

export default Main;
