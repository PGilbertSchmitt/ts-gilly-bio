import React, { FunctionComponent as FC, useEffect } from 'react';
import { StateProjectItem } from '@gilly/common';

import Marked from '@comp/content/marked/marked';

interface ProjectItemProps {
  project?: StateProjectItem;
}

const ProjectItem: FC<ProjectItemProps> = ({ project }) => {
  if (project) {
    return (
      <Marked customClass='project-page' src={project.content} />
    );
  }

  return (
    <div>Loading...</div>
  );
};

export default ProjectItem;
