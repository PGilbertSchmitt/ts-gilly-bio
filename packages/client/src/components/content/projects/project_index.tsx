import React, { FunctionComponent as FC, useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import isEmpty from 'ramda/es/isEmpty';
import { Link } from 'react-router-dom';

import { IProjectIndexItem } from '@gilly/common';
import { fetchProjectIndex } from '@actions/project_actions';
import { RootState } from '@reducers/_root_reducer';

interface DispatchProps {
  loadIndex: () => void;
}

interface StateProps {
  loading: boolean;
  index: IProjectIndexItem[];
}

type Props = DispatchProps & StateProps;

const ProjectIndex: FC<Props> = ({ loadIndex, loading, index }) => {
  useEffect(() => {
    if (loading) {
      loadIndex();
    }
  }, [loading]);

  if (loading) {
    return (
      <div>Loading Projects...</div>
    );
  }

  if (isEmpty(index)) {
    return (
      <div>No projects...</div>
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

const mapStateToProps = (
  { projectIndex: { loading, index } }: RootState,
): StateProps => ({
  loading,
  index,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  loadIndex: () => dispatch(fetchProjectIndex()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectIndex);
