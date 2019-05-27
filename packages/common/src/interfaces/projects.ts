import pick from 'lodash/pick';

import { stringLiteralArray } from '../utils';
import { MarkdownDoc } from '@gilly/marker/src/ast';

interface IProjectUrl {
  name: string;
  url: string;
}

export interface APIProject {
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

export type IProjectIndexItem = Pick<APIProject, typeof indexKeys[number]>;
export const pickProjectIndexItem = (proj: APIProject) => pick(proj, indexKeys);

const slugKeys = stringLiteralArray([
  'title',
  'urls',
  'stack',
  'header_image_path',
  'content',
]);

export type APIProjectItem = Pick<APIProject, typeof slugKeys[number]>;
export const pickProjectItem = (proj: APIProject) => pick(proj, slugKeys);

export interface StateProjectItem {
  readonly title: string;
  readonly stack: string[];
  readonly urls: IProjectUrl[];
  readonly headerImagePath: string;
  readonly content: MarkdownDoc;
}
