import React, { FunctionComponent as FC, useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';

import CommitItem from '@comp/content/widgets/commit_item';
import { fetchGithubCommits } from '@actions/github_actions';
import { ICommit } from '@res/github_commit_response';
import { RootState } from '@reducers/_root_reducer';

import styles from '@styles/github.scss';

interface DispatchProps {
  loadCommits: (repoName: string) => void;
}

interface StateProps {
  commits: undefined | ICommit[];
}

interface OwnProps {
  repo: string;
  open: boolean;
}

type Props = DispatchProps & StateProps & OwnProps;

const CommitList: FC<Props> = ({ loadCommits, commits, repo, open }) => {
  useEffect(() => {
    if (!commits && open) {
      loadCommits(repo);
    }
  }, [commits, open]);

  if (!commits) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <List className={styles.repoList}>
      {commits.map(commit => (
        <CommitItem commit={commit} key={commit.sha} />
      ))}
    </List>
  );
};

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({
  commits: state.commits[ownProps.repo],
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  loadCommits: (repoName: string) => dispatch(fetchGithubCommits(repoName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommitList);
