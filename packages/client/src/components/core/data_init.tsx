import React, { FunctionComponent as FC, useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { loadGithubData } from '@actions/github_actions';

/* This component performs all of the data loading for when the page starts */

interface Props {
  loadGithub: () => void;
}

const DataInit: FC<Props> = ({ children, loadGithub }) => {
  useEffect(() => {
    loadGithub();
  }, []);

  return (
    <div>
      {children}
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): Props => ({
  loadGithub: () => dispatch(loadGithubData()),
});

export default connect(
  null,
  mapDispatchToProps,
)(DataInit);
