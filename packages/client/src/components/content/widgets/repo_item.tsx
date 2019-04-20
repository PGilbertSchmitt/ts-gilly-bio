import React, { FunctionComponent as FC, useState } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import CommitList from '@comp/content/widgets/commit_list';

import styles from '@styles/github.scss';
import { IRepo } from '@res/github_repo_response';

interface OwnProps {
  repo: IRepo;
  open: boolean;
  onOpen: () => void;
}

const RepoItem: FC<OwnProps> = ({ repo, open, onOpen }) => (
  <ExpansionPanel
    square
    onChange={onOpen}
    expanded={open}
  >
    <ExpansionPanelSummary className={styles.repoHeader}>
      <h3>{repo.full_name}</h3>
    </ExpansionPanelSummary>

    <ExpansionPanelDetails>
      <CommitList repo={repo.full_name} open={open} />
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

export default RepoItem;
