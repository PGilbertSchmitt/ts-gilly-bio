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

export type APIProjectIndexItem = Pick<APIProject, typeof indexKeys[number]>;
export type StateProjectIndexItem = APIProjectIndexItem;
export const pickProjectIndexItem = (proj: APIProject) => pick(proj, indexKeys);

// The project item can switch between the datatype of the content, so I'm using
// more than just a pick type.

const slugKeys = stringLiteralArray([
  'title',
  'urls',
  'stack',
  'header_image_path',
  'content',
]);

interface BaseProjectItem {
  readonly title: string;
  readonly stack: string[];
  readonly urls: IProjectUrl[];
  readonly header_image_path: string;
}

export interface APIProjectItem extends BaseProjectItem {
  readonly content: string;
}

export interface StateProjectItem extends BaseProjectItem {
  readonly content: MarkdownDoc;
}

export const pickProjectItem = (proj: APIProject) => (
  pick(proj, slugKeys) as APIProjectItem
);
