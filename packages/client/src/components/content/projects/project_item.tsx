import React, { FunctionComponent as FC, useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import has from 'ramda/es/has';

import { IProjectItem } from '@gilly/common';
import { fetchProject } from '@actions/project_actions';
import { RootState } from '@reducers/_root_reducer';

type StateProps = {
  loading: true;
} | {
  loading: false;
  converted: boolean;
  project: IProjectItem;
};

interface DispatchProps {
  loadProject: (slug: string) => void;
}

type RouteProps = RouteComponentProps<{ slug: string }>;

type Props = StateProps & DispatchProps & RouteProps;

const ProjectItem: FC<Props> = (props) => {
  const { loading, match, loadProject } = props;
  useEffect(() => {
    if (loading) {
      loadProject(match.params.slug);
    }
  }, [loading]);

  if (props.loading || !props.converted) {
    return (
      <div>Loading...</div>
    );
  }

  const { project } = props;

  // Doesn't seem likely, but best to be prepared. Maybe this should be a 404.
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

  if (loading) {
    return { loading };
  }

  const { project, converted } = projects[slug];

  return {
    loading,
    converted,
    project,
  };
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