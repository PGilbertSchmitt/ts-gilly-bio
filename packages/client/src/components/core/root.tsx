import React, { SFC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { jssPreset, createGenerateClassName } from '@material-ui/core/styles';

import Main from '@comp/core/main';
import Header from '@comp/nav/header';

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: 'jss-insertion-point',
});

const Root: SFC = () => (
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <Router>
      <Header />
      <Main />
    </Router>
  </JssProvider>
);

export default Root;