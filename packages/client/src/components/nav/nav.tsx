import React, { SFC } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import styles from '@styles/header.scss';

const Nav: SFC = () => (
  <div>
    <Link to='/blog'>
      <Button className={styles.button}>Blog</Button>
    </Link>
    <Link to='/projects'>
      <Button className={styles.button}>Projects</Button>
    </Link>
  </div>
);

export default Nav;
