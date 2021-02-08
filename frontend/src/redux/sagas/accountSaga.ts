import { call, put, takeEvery } from 'redux-saga/effects';
import { accountApi, AccountResponse } from '../../api/accountApi';
import {
	accountActions,
	ChangeNameAction,
	ChangePasswordAction,
	CHANGE_NAME,
	CHANGE_PASSWORD,
	LoadAccountAction,
	LOAD_ACCOUNT,
} from '../reducers/accountReducer';
import { getErrorMessage, setErrorMessage, setOkMessage } from './sagaUtils';

function* loadAccount({ token }: LoadAccountAction) {
	try {
		const data: AccountResponse = yield call(accountApi.loadAccount, token);
		yield put(accountActions.setAccount(data.data.account));
	} catch (err) {
		yield put(accountActions.loadAccountFailure(getErrorMessage(err)));
	}
}

function* changeName({ token, name }: ChangeNameAction) {
	try {
		const data: AccountResponse = yield call(accountApi.changeName, token, name);
		yield put(accountActions.setAccount(data.data.account));
		yield setOkMessage(data.message);
	} catch (err) {
		yield put(accountActions.changeNameFailure(getErrorMessage(err)));
		yield setErrorMessage(getErrorMessage(err));
	}
}

function* changePassword({ token, currentPassword, newPassword }: ChangePasswordAction) {
	try {
		const data: AccountResponse = yield call(
			accountApi.changePassword,
			token,
			currentPassword,
			newPassword
		);
		yield put(accountActions.setAccount(data.data.account));
		yield setOkMessage(data.message);
	} catch (err) {
		yield put(accountActions.changePasswordFailure(getErrorMessage(err)));
		yield setErrorMessage(getErrorMessage(err));
	}
}

export function* accountSaga() {
	yield takeEvery(LOAD_ACCOUNT, loadAccount);
	yield takeEvery(CHANGE_NAME, changeName);
	yield takeEvery(CHANGE_PASSWORD, changePassword);
}
