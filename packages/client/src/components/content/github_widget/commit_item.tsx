import React, { FunctionComponent as FC } from 'react';
import ListItem from '@material-ui/core/ListItem';
import take from 'lodash/take';
import distanceInWords from 'date-fns/distance_in_words_to_now';

import { GhIcon } from '@assets/svg_icon';
import { ICommit } from '@res/github_commit_response';

import styles from '@styles/github.scss';

interface CommitItemProps {
  commit: ICommit;
}

const CommitItem: FC<CommitItemProps> = ({ commit }) => {
  const iconType = commit.parents.length === 1 ? 'commit' : 'merge';

  return (
    <ListItem className={styles.commitItem}>
      {/* TODO: Should replace these with more classes */}
      <GhIcon margin='0 20px 0 0' width={20} height={20} icon={iconType} />
      <div>
        <p className={styles.commitNote}>
          <a href={commit.html_url} target='_blank'>{take(commit.sha, 12)}</a>:
        </p>
        <p className={styles.commitMessage}>{commit.commit.message}</p>
        <p className={styles.commitNote}>->  Made {distanceInWords(commit.commit.committer.date)} ago.</p>
      </div>
    </ListItem>
  );
};

export default CommitItem;
