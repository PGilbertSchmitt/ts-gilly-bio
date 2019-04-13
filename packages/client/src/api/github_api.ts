import mergeRight from 'ramda/es/mergeRight';
import axios, { AxiosRequestConfig as AxConfig, AxiosResponse } from 'axios';

import { IRepoResponse, IRepo, filterResponse } from '@res/github_repo_response';

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
    // Only need the 5 most recent repos
    (data: string): IRepoResponse[] => {
      const repos = JSON.parse(data) as IRepoResponse[];
      return repos.slice(0, 5);
    },

    // Filter out unnecessary data
    (data: IRepoResponse[]): IRepo[] => {
      const filteredRepos = data.map(filterResponse);
      return filteredRepos;
    },
  ],
});

export const getRepos = async () => {
  try {
    const repos: AxiosResponse<IRepo> = await axios.get(
      '/users/PGilbertSchmitt/repos',
      repoConfig,
    );
    return repos;
  } catch (e) {
    console.log('Bad stuff!');
    console.log(e);
  }
};

const commitConfig = mergeRight<AxConfig, AxConfig>(baseConfig, {
  transformResponse: [
    (data: string) => {
      const commits = JSON.parse(data);
      console.log('Commits:', commits);
      return commits;
    },
  ],
});

export const getCommits = async (repo: string) => {
  try {
    const commits = await axios.get(
      '/repos/PGilbertSchmitt/${repo}/commits',
      commitConfig,
    );
  } catch (e) {
    console.log('More bad stuff!');
    console.group(e);
  }
};
