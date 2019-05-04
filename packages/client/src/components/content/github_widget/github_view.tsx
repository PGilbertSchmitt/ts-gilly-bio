import React, { FunctionComponent as FC, useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import isEmpty from 'ramda/src/isEmpty';

import RepoItem from '@comp/content/github_widget/repo_item';
import { fetchGithubRepos } from '@actions/github_actions';
import { IRepo } from '@res/github_repo_response';
import { RootState } from '@reducers/_root_reducer';

import styles from '@styles/github.scss';

interface DispatchProps {
  loadRepos: () => void;
}

interface StateProps {
  repos: IRepo[];
}

type Props = DispatchProps & StateProps;

const GithubView: FC<Props> = ({ loadRepos, repos }) => {
  const [currentRepo, setCurrentRepo] = useState('');

  useEffect(() => {
    if (isEmpty(repos)) {
      loadRepos();
    } else {
      setCurrentRepo(repos[0].full_name);
    }
  }, [repos]);

  if (isEmpty(repos)) {
    return (
      <div>LOADING REPOS...</div>
    );
  }

  return (
    <div className={styles.githubView}>
      {
        repos.map((repo) => (
          <RepoItem
            repo={repo}
            open={repo.full_name === currentRepo}
            onOpen={() => setCurrentRepo(repo.full_name)}
            key={repo.full_name}
          />
        ))
      }
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  repos: state.repos,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  loadRepos: () => dispatch(fetchGithubRepos()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GithubView);