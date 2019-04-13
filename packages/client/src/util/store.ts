import { createStore, applyMiddleware, Action } from 'redux';
import createSagaMiddleware from 'redux-saga';

import RootReducer, { RootState } from '@reducers/_root_reducer';
import RootSaga from '@sagas/_root_saga';

const sagaMiddleware = createSagaMiddleware();

export default createStore<RootState, Action, {}, {}>(
  RootReducer,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(RootSaga);
