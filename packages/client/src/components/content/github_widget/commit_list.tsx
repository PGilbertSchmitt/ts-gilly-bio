import React, { FunctionComponent as FC, useEffect } from 'react';
import List from '@material-ui/core/List';

import CommitItem from '@comp/content/github_widget/commit_item';
import { ICommit } from '@res/github_commit_response';
import { githubHooks } from '@src/store/root_state';

import styles from '@styles/github.scss';
import { refresh } from '@src/util/render_state';

interface CommitListProps {
  commits: undefined | ICommit[];
  repo: string;
  open: boolean;
}

const CommitList: FC<CommitListProps> = ({ commits, repo, open }) => {
  useEffect(() => {
    if (!commits && open) {
      githubHooks.fetchGithubCommits(repo).then(refresh);
    }
  }, [commits, open]);

  if (!commits) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <List className={styles.commitList}>
      {commits.map(commit => (
        <CommitItem commit={commit} key={commit.sha} />
      ))}
    </List>
  );
};

export default CommitList;
