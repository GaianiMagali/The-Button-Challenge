import { call, put } from 'redux-saga/effects';
import { userLoggedRequestActions } from '../login';
import { api } from './api-service';

function* fetchEntities(apiFunction, actions, id, param) {
    try {
        yield put(actions.pending());

        const data = yield call(apiFunction, param || id);

        if (data.length > 0) {
            yield put(actions.success(data));
        } else {
            yield put(actions.failed(data));
        }

    } catch (error) {
        yield put(actions.failed(error));
    }
}

export const login = fetchEntities.bind(null, api.login, userLoggedRequestActions);
