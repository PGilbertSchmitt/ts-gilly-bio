import React, { Component, MouseEvent } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import styles from '@styles/header.scss';

// Base routes in the nav
const NavList = [
  {
    path: '/',
    text: 'Home',
  },
  {
    path: '/blog',
    text: 'Blog',
  },
  {
    path: '/projects',
    text: 'Projects',
  },
];

interface IState {
  anchorEl: null | HTMLElement;
  path: string;
}

type IProps = RouteComponentProps;

class MobileNav extends Component<IProps, IState> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      anchorEl: null,
      path: props.location.pathname,
    };
  }

  componentWillReceiveProps(nextProps: IProps) {
    // This delay is to ensure that the menu has a chance to disappear before the path's update causes it to rerender
    const { pathname } = nextProps.location;
    if (pathname !== this.state.path) {
      setTimeout(() => {
        this.setState({ path: pathname });
      }, 500);
    }
  }

  private handleClick = (event: MouseEvent) => {
    this.setState({
      anchorEl: event.currentTarget as HTMLElement,
    });
  }

  private handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  }

  public render = () => {
    const { anchorEl, path } = this.state;

    return (
      <div>
        <IconButton
          onClick={this.handleClick}>
          <MoreVert className={styles.menuIcon} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={!!anchorEl}
          disableAutoFocusItem={true}
          onClose={this.handleClose}
        >
          {
            NavList.filter((nav) => (nav.path !== path))
              .map((nav) => (
                <Link to={nav.path} key={nav.path}>
                  <MenuItem
                    onClick={this.handleClose}
                    selected={false}
                  >
                    {nav.text}
                  </MenuItem>
                </Link>
              ))
          }
        </Menu>
      </div>
    );
  }
}

export default withRouter(MobileNav);
