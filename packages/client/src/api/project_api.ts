import axios, {
  AxiosResponse, AxiosRequestConfig
} from 'axios';

import {
  IProjectIndexItem,
  Error,
  APIProjectItem,
  StateProjectItem,
} from '@gilly/common';

import { parseMarkdown } from '@gilly/marker';

export const getProjectIndex = async () => {
  try {
    const projects: AxiosResponse<IProjectIndexItem[]> = await axios.get('/api/projects/');
    return projects;
  } catch (e) {
    console.log('Not happy');
    console.log(e);
  }
};

const getProjectConfig: AxiosRequestConfig = {
  transformResponse: [
    // Parse into JSON
    (data: string): APIProjectItem => (
      JSON.parse(data) as APIProjectItem
    ),

    // Convert project content from markdown to an AST
    (project: APIProjectItem): StateProjectItem => {
      const { title, stack, urls, header_image_path, content } = project;
      const convertedContent = parseMarkdown(content);
      return {
        title,
        stack,
        urls,
        headerImagePath: header_image_path,
        content: convertedContent,
      };
    },
  ]
};

export const getProject = async (slug: string) => {
  try {
    const project: AxiosResponse<StateProjectItem | Error> = await axios.get(
      `/api/projects/${slug}`,
      getProjectConfig,
    );
    return project;
  } catch (e) {
    console.log('More not happy');
    console.log(e);
  }
};
