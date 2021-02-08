import { all, fork } from 'redux-saga/effects';
import { appSaga } from './appSaga';
import { authSaga } from './authSaga';
import { cartSaga } from './cartSaga';
import { shopSaga } from './shopSaga';
import { accountSaga } from './accountSaga';

export function* rootSaga() {
	yield all([fork(authSaga), fork(cartSaga), fork(shopSaga), fork(appSaga), fork(accountSaga)]);
}
