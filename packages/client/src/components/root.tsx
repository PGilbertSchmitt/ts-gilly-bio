import React, { SFC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Main from '@src/components/main';
import Header from '@src/components/header';

const Root: SFC = () => (
  <Router>
    <Header />
    <Main />
  </Router>
);

export default Root;
