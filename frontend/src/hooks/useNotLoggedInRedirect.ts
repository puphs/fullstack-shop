import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppState } from '../redux/store';
import { NOT_LOGGED_IN } from '../pages/OopsPage/OopsPage';
import { useEffect } from 'react';

export const useNotLoggedInRedirect = (afterLoginRedirectTo: string = '') => {
	const history = useHistory();
	const token = useSelector((state: AppState) => state.auth.token);

	useEffect(() => {
		if (!token) {
			if (afterLoginRedirectTo) {
				history.push(`/oops/${NOT_LOGGED_IN}?redirectTo=${afterLoginRedirectTo}`);
			}
		}
	}, [token, afterLoginRedirectTo]);
};
