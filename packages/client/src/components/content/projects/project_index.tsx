import React, { FunctionComponent as FC, useEffect } from 'react';
import isEmpty from 'ramda/es/isEmpty';
import { Link } from 'react-router-dom';

import { StateProjectIndexItem } from '@gilly/common';

interface ProjectIndexProps {
  index: StateProjectIndexItem[];
}

const ProjectIndex: FC<ProjectIndexProps> = ({ index }) => {
  if (isEmpty(index)) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div style={{ backgroundColor: 'lightblue' }}>
      <h1>I've got projects! Look at me, I'm a regular cReAtOr!!</h1>

      {
        index.map(({ title, slug }) => (
          <div key={slug}>
            <h4>{title}</h4>
            <Link to={`/projects/${slug}`}>Click me!</Link>
          </div>
        ))
      }
    </div>
  );
};

export default ProjectIndex;
