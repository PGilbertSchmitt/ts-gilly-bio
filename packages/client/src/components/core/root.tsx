import React, { FunctionComponent as FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { jssPreset, createGenerateClassName } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Main from '@comp/core/main';
import Header from '@comp/nav/header';
import { store } from '@src/store/root_state';

// This just ensures the global body style is recognized by the compiler
import { underlined } from '@styles/_layout.scss';
underlined; //tslint:disable-line

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: 'jss-insertion-point',
});

export interface AppProps {
  store: typeof store;
}

const Root: FC<AppProps> = ({ children, ...rest }) => (
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <CssBaseline>
      <Router>
        <Header />
        <Main {...rest} />
      </Router>
    </CssBaseline>
  </JssProvider >
);

export default Root;
