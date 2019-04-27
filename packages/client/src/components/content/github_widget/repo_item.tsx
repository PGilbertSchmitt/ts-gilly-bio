import React, { FunctionComponent as FC } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import CommitList from '@comp/content/github_widget/commit_list';
import { IRepo } from '@res/github_repo_response';

import styles from '@styles/github.scss';

interface OwnProps {
  repo: IRepo;
  open: boolean;
  onOpen: () => void;
}

const headerClasses = (open: boolean) => {
  return open ? styles.repoHeader + ' ' + styles.headerOpen : styles.repoHeader;
};

const RepoItem: FC<OwnProps> = ({ repo, open, onOpen }) => (
  <ExpansionPanel
    square
    onChange={onOpen}
    expanded={open}
    className={styles.repoView}
  >
    <ExpansionPanelSummary className={headerClasses(open)}>
      <h3>{repo.full_name}</h3>
    </ExpansionPanelSummary>

    <ExpansionPanelDetails className={styles.commitBox}>
      <CommitList repo={repo.full_name} open={open} />
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

export default RepoItem;
