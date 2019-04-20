import React, { FunctionComponent as FC } from 'react';

import GithubView from '@comp/content/widgets/github_view';

const Homepage: FC = () => (
  <div style={{ width: '100%', height: '900px', backgroundColor: 'magenta' }}>
    <GithubView />
  </div>
);

export default Homepage;
