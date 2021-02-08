import axios from 'axios';
import { put } from 'redux-saga/effects';
import { Response } from '../../api/apiUtils';
import { Message, MessageStatus } from '../../types/types';
import { appActions } from '../reducers/appReducer';

export const getErrorMessage = (err: any): string => {
	if (axios.isAxiosError(err)) {
		if (err.response?.data.message) {
			return err.response.data.message;
		}
		return err.message;
	}
	return 'Something went wrong';
};

export function* setOkMessage(text: string) {
	yield put(appActions.setMessage({ text, status: MessageStatus.OK }));
}
export function* setErrorMessage(text: string) {
	yield put(appActions.setMessage({ text, status: MessageStatus.ERROR }));
}
