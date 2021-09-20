import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';

export default function configureStore() {
    // create the saga middleware
    const sagaMiddleware = createSagaMiddleware();
    let middleware = applyMiddleware(sagaMiddleware);

    if (process.env.NODE_ENV !== 'production') {
        const devToolsExtension = window.devToolsExtension;
        if (typeof devToolsExtension === 'function') {
            middleware = compose(middleware, devToolsExtension());
        }
    }

    // mount it on the Store
    const store = createStore(reducers, middleware)

    // then run the saga
    sagaMiddleware.run(sagas)

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(require('./reducers').default);
        })
    }

    return store;
}