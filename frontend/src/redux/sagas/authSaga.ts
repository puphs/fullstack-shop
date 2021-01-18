import { call, put, takeEvery } from 'redux-saga/effects';
import { authApi, AuthResponse } from '../../api/authApi';
import { removeAuthData, saveAuthData } from '../../helpers/authHelper';
import {
	actions,
	LOGIN,
	LoginAction,
	LOGOUT,
	REGISTER,
	RegisterAction,
} from '../reducers/authReducer';
import { getErrorMessage } from './sagaUtils';

function* login({ email, password }: LoginAction) {
	try {
		const data: AuthResponse = yield call(authApi.login, email, password);
		saveAuthData(data);
		yield put(actions.loginSuccess(data.token, data.userId));
	} catch (err) {
		yield put(actions.loginFailure(getErrorMessage(err)));
	}
}

function* logout() {
	removeAuthData();
	yield put(actions.logoutSuccess());
}

function* register({ email, name, password }: RegisterAction) {
	try {
		const data: AuthResponse = yield call(authApi.register, email, name, password);
		saveAuthData(data);
		yield put(actions.registerSuccess(data.token, data.userId));
	} catch (err) {
		yield put(actions.registerFailure(getErrorMessage(err)));
	}
}

export function* authSaga() {
	yield takeEvery(LOGIN, login);
	yield takeEvery(LOGOUT, logout);
	yield takeEvery(REGISTER, register);
}
