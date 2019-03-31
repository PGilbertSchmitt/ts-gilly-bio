import React, { SFC } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ToolBar from '@material-ui/core/Toolbar';
import Typeography from '@material-ui/core/Typography';

import styles from '@styles/header.scss';

const Header: SFC = () => {
  return (
    <AppBar position='static' className={styles.appBar}>
      <ToolBar className={styles.toolbar}>
        <Link to='/'>
          <Typeography noWrap variant='h5' className={styles.logo}>
            P. Gilbert Schmitt
          </Typeography>
        </Link>
        <div>
          <Link to='/blog'>
            <Button color='primary' className={styles.button}>Blog</Button>
          </Link>
          <Link to='/projects'>
            <Button color='primary' className={styles.button}>Projects</Button>
          </Link>
        </div>
      </ToolBar>
    </AppBar>
  );
};

export default Header;
