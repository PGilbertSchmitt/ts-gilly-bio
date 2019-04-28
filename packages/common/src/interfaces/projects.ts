import pick from 'lodash/pick';

import { stringLiteralArray } from '../utils';

interface IProjectUrl {
  name: string;
  url: string;
}

export interface IProject {
  readonly title: string;
  readonly desc: string;
  readonly urls: IProjectUrl[];
  readonly slug: string;
  readonly stack: string[];
  readonly thumbnail_path: string;
  readonly header_image_path: string;
  readonly content: string;
}

const indexKeys = stringLiteralArray([
  'title',
  'desc',
  'stack',
  'slug',
  'thumbnail_path',
]);

export type IProjectIndexItem = Pick<IProject, typeof indexKeys[number]>;
export const pickProjectIndexItem = (proj: IProject) => pick(proj, indexKeys);

const slugKeys = stringLiteralArray([
  'title',
  'urls',
  'stack',
  'header_image_path',
  'content',
]);

export type IProjectItem = Pick<IProject, typeof slugKeys[number]>;
export const pickProjectItem = (proj: IProject) => pick(proj, slugKeys);
