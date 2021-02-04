import { useHistory } from 'react-router-dom';

export const useRedirectTo = () => {
	const history = useHistory();
	return new URLSearchParams(history.location.search).get('redirectTo') ?? '/';
};
