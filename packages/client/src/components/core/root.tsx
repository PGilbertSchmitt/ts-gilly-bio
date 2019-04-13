import React, { FunctionComponent as FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { jssPreset, createGenerateClassName } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Main from '@comp/core/main';
import DataInit from '@comp/core/data_init';
import Header from '@comp/nav/header';
import store from '@util/store';

// This just ensures the global body style is recognized by the compiler
import { underlined } from '@styles/_layout.scss';
underlined; //tslint:disable-line

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: 'jss-insertion-point',
});

const Root: FC = () => (
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <CssBaseline>
      <Provider store={store}>
        <DataInit>
          <Router>
            <Header />
            <Main />
          </Router>
        </DataInit>
      </Provider>
    </CssBaseline>
  </JssProvider >
);

// TODO: DELETE
(window as any).store = store;

export default Root;
