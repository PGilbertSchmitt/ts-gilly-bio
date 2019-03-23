import React, { SFC } from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

const Header: SFC = () => (
  <div>
    <Link to='/'>
      <Button variant='outlined' color='primary'>Home</Button>
    </Link>
    <Link to='/blog'>
      <Button variant='outlined' color='primary'>Blog</Button>
    </Link>
    <Link to='/projects'>
      <Button variant='outlined' color='primary'>Projects</Button>
    </Link>
  </div>
);

export default Header;
