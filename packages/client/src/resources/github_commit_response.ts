import pick from 'ramda/es/pick';
import filter from 'ramda/es/filter';

import { stringLiteralArray } from '@gilly/common';
import { MY_GITHUB_LOGIN } from '@util/constants';

export interface ICommitResponse {
  sha: string;
  node_id: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
    tree: {
      sha: string;
      url: string;
    };
    url: string;
    comment_count: number;
    verification: {
      verified: boolean;
      reason: string;
      signature: null;
      payload: null;
    }
  };
  url: string;
  html_url: string;
  comments_url: string;
  author: null | {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  committer: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  parents: Array<{
    sha: string;
    url: string;
    html_url: string;
  }>;
}

const topLevelKeys = stringLiteralArray(['sha', 'commit', 'html_url', 'parents']);

// Additional null check, since github response can have a null author
// I believe that indicates a merge request, which isn't important for now.
// If I want to include those, I'll have to check a different value
export const isMyCommit = (commit: ICommitResponse) => (
  !!commit.author && commit.author.login.toLowerCase() === MY_GITHUB_LOGIN
);
export const filterByAuthor = filter(isMyCommit);

export const pickResponse = pick(topLevelKeys);

export type ICommit = Pick<ICommitResponse, typeof topLevelKeys[number]>;
