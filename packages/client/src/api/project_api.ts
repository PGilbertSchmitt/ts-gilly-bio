import axios, { AxiosResponse } from 'axios';

import {
  IProjectIndexItem,
  IProjectItem,
  Error,
} from '@gilly/common';

export const getProjectIndex = async () => {
  try {
    const projects: AxiosResponse<IProjectIndexItem[]> = await axios.get('/api/projects/');
    return projects;
  } catch (e) {
    console.log('Not happy');
    console.log(e);
  }
};

export const getProject = async (slug: string) => {
  try {
    const project: AxiosResponse<IProjectItem | Error> = await axios.get(`/api/projects/${slug}`);
    return project;
  } catch (e) {
    console.log('More not happy');
    console.log(e);
  }
};
