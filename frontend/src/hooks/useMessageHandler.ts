import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../redux/reducers/appReducer';
import { AppState } from '../redux/store';

export const useMessageHandler = () => {
	const message = useSelector((state: AppState) => state.app.message);
	const dispatch = useDispatch();

	useEffect(() => {
		if (message) {
			toast(message.text);
			dispatch(appActions.handleMessage());
		}
	}, [message]);
};
