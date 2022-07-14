import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '@reducers'
import { logger, /* router, */ reduxRouterMiddleware } from './index'
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../redux/sagas';

const nextReducer = require('@reducers')

export default function configure(initialState) {
  const create = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()(createStore)
    : createStore


  const sagaMiddleWare = createSagaMiddleware({
    onError: (err) => {
      console.error(err);
    },
  });

  const createStoreWithMiddleware = applyMiddleware(
    reduxRouterMiddleware,
    thunkMiddleware,
    sagaMiddleWare,
    logger,
    // router,
  )(create)

  const store = createStoreWithMiddleware(rootReducer, initialState)

  sagaMiddleWare.run(rootSaga);

  if (module.hot) {
    module.hot.accept('@reducers', () => {
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
