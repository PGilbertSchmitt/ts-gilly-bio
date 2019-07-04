import axios, {
  AxiosResponse, AxiosRequestConfig
} from 'axios';

import {
  APIProjectIndexItem,
  APIProjectItem,
  Error,
} from '@gilly/common';

export const getProjectIndex = async () => {
  try {
    const projects = await axios.get('/api/projects/') as AxiosResponse<APIProjectIndexItem[]>;
    return projects;
  } catch (e) {
    console.log('Not happy');
    console.log(e);
    return null;
  }
};

export const getProject = async (slug: string) => {
  try {
    const project: AxiosResponse<APIProjectItem | Error> = await axios.get(`/api/projects/${slug}`);
    return project;
  } catch (e) {
    console.log('More not happy');
    console.log(e);
    return null;
  }
};
