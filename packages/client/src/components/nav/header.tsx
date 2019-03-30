import React, { SFC } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

import styles from '@styles/header.scss';

const Header: SFC = () => {
  return (
    <AppBar position='static' className={styles.header}>
      <Link to='/'>
        <Button variant='contained' color='primary' className={styles.button}>Home</Button>
      </Link>
      <Link to='/blog'>
        <Button variant='contained' color='primary' className={styles.button}>Blog</Button>
      </Link>
      <Link to='/projects'>
        <Button variant='contained' color='primary' className={styles.button}>Projects</Button>
      </Link>
    </AppBar>
  );
};

export default Header;
