import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../redux/store';

type MessageSelector = (
	state: AppState
) => {
	message: string | null;
	messageType: number;
};

type MessageHandlerActionCreator = () => { type: string };

export const useMessageHandler = (
	messageSelector: MessageSelector,
	messageHandlerActionCreator: MessageHandlerActionCreator
) => {
	const { message, messageType } = useSelector(messageSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		if (message) {
			toast(message);
			dispatch(messageHandlerActionCreator());
		}
	}, [message]);
};
