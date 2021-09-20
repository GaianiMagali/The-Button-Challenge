import { call, fork, takeEvery, take } from 'redux-saga/effects';
import { login } from '../api';
import { setUserLogged } from '../session';
import { userLoggedActions } from './actions';

export function* signin({ payload }) {
    const { username } = payload;
    yield call(login, username);
}

//Watchers
export function* watchSignin() {
    yield takeEvery(userLoggedActions.LOGIN, signin);
}

export function* watchLoginUserSuccess() {
    while (true) {
        const { payload } = yield take(userLoggedActions.USER_LOGGED_SUCCESS);
        setUserLogged(payload.data[0]);
    }
}

//Root
export const userLoggedSaga = [
    fork(watchSignin),
    fork(watchLoginUserSuccess)
]