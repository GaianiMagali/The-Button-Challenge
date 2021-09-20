import { all } from 'redux-saga/effects';
import { userLoggedSaga } from './login';

export default function* sagas() {
    yield all([
        ...userLoggedSaga
    ])
}