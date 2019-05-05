import React, { FunctionComponent as FC, useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import has from 'ramda/es/has';

import { IProjectItem } from '@gilly/common';
import { fetchProject } from '@actions/project_actions';
import { RootState } from '@reducers/_root_reducer';

interface StateProps {
  loading: boolean;
  project: IProjectItem;
}

interface DispatchProps {
  loadProject: (slug: string) => void;
}

type RouteProps = RouteComponentProps<{ slug: string }>;

type Props = StateProps & DispatchProps & RouteProps;

const ProjectItem: FC<Props> = ({ match, project, loading, loadProject }) => {
  useEffect(() => {
    if (loading) {
      loadProject(match.params.slug);
    }
  }, [loading]);

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  if (project === undefined) {
    return (
      <div>Hmm, there doesn't seem to be a project at ${match.url}</div>
    );
  }

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.header_image_path}</p>
    </div>
  );
};

const mapStateToProps = ({ projects }: RootState, { match }: RouteProps): StateProps => {
  const { slug } = match.params;
  const loading = !has(slug, projects);

  return {
    loading,
    project: projects[slug],
  }
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  loadProject: (slug: string) => {
    dispatch(fetchProject(slug));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectItem);
