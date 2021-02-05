import { call, put, takeEvery } from 'redux-saga/effects';
import { accountApi, AccountResponse } from '../../api/accountApi';
import { actions, LoadAccountAction, LOAD_ACCOUNT } from '../reducers/accountReducer';
import { getErrorMessage } from './sagaUtils';

function* loadAccount({ token }: LoadAccountAction) {
	try {
		const data: AccountResponse = yield call(accountApi.loadAccount, token);
		yield put(actions.setAccount(data.data.account));
	} catch (err) {
		yield put(actions.loadAccountFailure(getErrorMessage(err)));
	}
}

export function* accountSaga() {
	yield takeEvery(LOAD_ACCOUNT, loadAccount);
}
