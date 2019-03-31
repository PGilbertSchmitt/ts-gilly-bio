import React, { SFC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { jssPreset, createGenerateClassName } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Main from '@comp/core/main';
import Header from '@comp/nav/header';

// This just ensures the global body style is recognized by the compiler
import { underlined } from '@styles/_layout.scss';
underlined; //tslint:disable-line

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: 'jss-insertion-point',
});

const Root: SFC = () => (
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <CssBaseline>
      <Router>
        <Header />
        <Main />
      </Router>
    </CssBaseline>
  </JssProvider>
);

export default Root;
