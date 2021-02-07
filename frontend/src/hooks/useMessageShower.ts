import { useDispatch } from 'react-redux';
import { appActions } from '../redux/reducers/appReducer';
import { Message } from '../types/types';

export const useShowMessage = () => {
	const dispatch = useDispatch();

	return (message: Message) => {
		dispatch(appActions.setMessage(message));
	};
};
