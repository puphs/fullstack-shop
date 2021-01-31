import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { Code, Response } from '../../api/apiUtils';
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

export function* handleTokenExpired(err: any) {
	if (axios.isAxiosError(err) && err.response) {
		const res = err.response.data as Response;
		if (res.code === Code.TOKEN_EXPIRED) {
			yield logout();
		}
	}
}

function* login({ email, password }: LoginAction) {
	try {
		const data: AuthResponse = yield call(authApi.login, email, password);
		saveAuthData(data.data);
		yield put(actions.loginSuccess(data.data.token, data.data.userId));
	} catch (err) {
		yield put(actions.loginFailure(getErrorMessage(err)));
	}
}

function* logout() {
	removeAuthData();
	yield put(actions.logoutSuccess());
	console.log('before logout');
}

function* register({ email, name, password }: RegisterAction) {
	try {
		const data: AuthResponse = yield call(authApi.register, email, name, password);
		saveAuthData(data.data);
		yield put(actions.registerSuccess(data.data.token, data.data.userId));
	} catch (err) {
		yield put(actions.registerFailure(getErrorMessage(err)));
	}
}

export function* authSaga() {
	yield takeEvery(LOGIN, login);
	yield takeEvery(LOGOUT, logout);
	yield takeEvery(REGISTER, register);
}
