import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { Code, Response } from '../../api/apiUtils';
import { authApi, AuthResponse } from '../../api/authApi';
import { removeAuthData, saveAuthData } from '../../helpers/authHelper';
import { accountActions } from '../reducers/accountReducer';
import { appActions } from '../reducers/appReducer';
import {
	authActions,
	LOGIN,
	LoginAction,
	LOGOUT,
	REGISTER,
	RegisterAction,
} from '../reducers/authReducer';
import { cartActions } from '../reducers/cartReducer';
import { getErrorMessage, setErrorMessage, setOkMessage } from './sagaUtils';

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
		const token = data.data.token;
		saveAuthData({ token });

		yield put(authActions.loginSuccess(token));
		yield put(accountActions.setAccount(data.data.account));
		yield setOkMessage(data.message);
	} catch (err) {
		yield put(authActions.loginFailure(getErrorMessage(err)));
		yield setErrorMessage(getErrorMessage(err));
	}
}

function* logout() {
	removeAuthData();
	yield put(authActions.logoutSuccess());
	yield put(cartActions.setCartItems([]));
}

function* register({ email, name, password }: RegisterAction) {
	try {
		const data: AuthResponse = yield call(authApi.register, email, name, password);
		const token = data.data.token;
		saveAuthData({ token });

		yield put(authActions.registerSuccess(token));
		yield put(accountActions.setAccount(data.data.account));
		yield setOkMessage(data.message);
	} catch (err) {
		yield put(authActions.registerFailure(getErrorMessage(err)));
		yield setErrorMessage(getErrorMessage(err));
	}
}

export function* authSaga() {
	yield takeEvery(LOGIN, login);
	yield takeEvery(LOGOUT, logout);
	yield takeEvery(REGISTER, register);
}
