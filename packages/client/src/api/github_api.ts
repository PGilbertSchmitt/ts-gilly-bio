import mergeRight from 'ramda/es/mergeRight';
import axios, { AxiosRequestConfig as AxConfig, AxiosResponse } from 'axios';

import {
  IRepoResponse,
  IRepo,
  pickResponse as filterRepos,
} from '@res/github_repo_response';

import {
  ICommitResponse,
  ICommit,
  filterByAuthor,
  pickResponse as filterCommits,
} from '@res/github_commit_response';

const baseConfig: AxConfig = {
  baseURL: 'https://api.github.com',
};

const repoConfig = mergeRight<AxConfig, AxConfig>(baseConfig, {
  params: {
    type: 'all',
    sort: 'pushed',
  },
  // This is such a good config option, I love it
  transformResponse: [
    // Parse into JSON
    (data: string): IRepoResponse[] => {
      return JSON.parse(data) as IRepoResponse[];
    },

    // Only need the 5 most recent repos
    (repos: IRepoResponse[]): IRepoResponse[] => {
      return repos.slice(0, 5);
    },

    // Filter out unnecessary keys
    (repos: IRepoResponse[]): IRepo[] => {
      const filteredRepos = repos.map(filterRepos);
      return filteredRepos;
    },
  ],
});

export const getRepos = async () => {
  try {
    const repos: AxiosResponse<IRepo[]> = await axios.get(
      '/users/PGilbertSchmitt/repos',
      repoConfig,
    );
    return repos;
  } catch (e) {
    console.log('Bad stuff!');
    console.log(e);
    return null;
  }
};

const commitConfig = mergeRight<AxConfig, AxConfig>(baseConfig, {
  // Thank you Axios
  transformResponse: [
    // Parse into JSON
    (data: string): ICommitResponse[] => (
      JSON.parse(data) as ICommitResponse[]
    ),

    // Only get my own commits
    (commits: ICommitResponse[]): ICommitResponse[] => (
      filterByAuthor(commits)
    ),

    // Only need the 10 most recent commits
    (commits: ICommitResponse[]): ICommitResponse[] => (
      commits.slice(0, 10)
    ),

    // Filter out unnecessary keys
    (commits: ICommitResponse[]): ICommit[] => (
      commits.map(filterCommits)
    ),
  ],
});

// repo param should be `<user>/<repo_name>`, which is returned as the 'full_name' value in the repo response
export const getCommits = async (repo: string) => {
  try {
    const commits: AxiosResponse<ICommit[]> = await axios.get(
      `/repos/${repo}/commits`,
      commitConfig,
    );
    return commits;
  } catch (e) {
    console.log('More bad stuff!');
    console.group(e);
    return null;
  }
};
