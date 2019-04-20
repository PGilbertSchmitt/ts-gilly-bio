import { createStore, applyMiddleware, Action } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import RootReducer, { RootState } from '@reducers/_root_reducer';
import RootSaga from '@sagas/_root_saga';

const sagaMiddleware = createSagaMiddleware();

export default createStore<RootState, Action, {}, {}>(
  RootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
  ),
);
sagaMiddleware.run(RootSaga);
