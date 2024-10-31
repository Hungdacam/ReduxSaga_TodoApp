// store/store.js
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import todoReducer from './reducers';
import { todoSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(todoReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(todoSaga);

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
