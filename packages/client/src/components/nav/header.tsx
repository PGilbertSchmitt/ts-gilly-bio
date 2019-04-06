import React, { FunctionComponent as FC } from 'react';
import { Link } from 'react-router-dom';
import Media from 'react-media';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typeography from '@material-ui/core/Typography';

import Nav from '@comp/nav/nav';
import MobileNav from '@comp/nav/mobile_nav';

import styles from '@styles/header.scss';

const querySwitch = (match: boolean) => (
  match
    ? (<MobileNav />) // <600px
    : (<Nav />)       // >600px
);

const Header: FC = () => {
  return (
    <AppBar position='static' className={styles.appBar}>
      <ToolBar className={styles.toolbar}>
        <Link to='/'>
          <Typeography noWrap variant='h5' className={styles.logo}>
            P. Gilbert Schmitt
          </Typeography>
        </Link>

        {/* MEDIA QUERY */}
        <Media query={{ maxWidth: 600 }}>
          {querySwitch}
        </Media>
      </ToolBar>
    </AppBar>
  );
};

export default Header;
