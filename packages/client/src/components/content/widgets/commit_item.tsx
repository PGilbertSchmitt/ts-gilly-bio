import React, { FunctionComponent as FC } from 'react';
import ListItem from '@material-ui/core/ListItem';

import { ICommit } from '@res/github_commit_response';

import styles from '@styles/github.scss';

interface OwnProps {
  commit: ICommit;
}

type Props = OwnProps;

const CommitItem: FC<Props> = ({ commit }) => (
  <ListItem className={styles.repoItem}>
    {commit.commit.message}
  </ListItem>
);

export default CommitItem;
