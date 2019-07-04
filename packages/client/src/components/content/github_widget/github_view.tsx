import React, { FunctionComponent as FC, useState, useEffect } from 'react';
import isEmpty from 'ramda/src/isEmpty';

import RepoItem from '@comp/content/github_widget/repo_item';
import { IRepo } from '@res/github_repo_response';
import { ICommit } from '@res/github_commit_response';
import { githubHooks } from '@src/store/root_state';
import { refresh } from '@src/util/render_state';

import styles from '@styles/github.scss';

interface GithubViewProps {
  repos: IRepo[];
  allCommits: {
    [reponame: string]: ICommit[];
  };
}

const GithubView: FC<GithubViewProps> = ({ repos, allCommits }) => {
  const [currentRepo, setCurrentRepo] = useState('');

  useEffect(() => {
    if (isEmpty(repos)) {
      githubHooks.fetchGithubRepos().then(refresh);
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
            commits={allCommits[repo.full_name]}
            open={repo.full_name === currentRepo}
            onOpen={() => setCurrentRepo(repo.full_name)}
            key={repo.full_name}
          />
        ))
      }
    </div>
  );
};

export default GithubView;
