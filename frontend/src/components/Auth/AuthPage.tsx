import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useMessageHandler } from '../../hooks/useMessageHandler';
import { actions } from '../../redux/reducers/authReducer';
import { AppState } from '../../redux/store';
import styles from './AuthPage.module.scss';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';

const AuthPage: React.FC = () => {
	const isAuth = useSelector((state: AppState) => state.auth.token !== null);

	const history = useHistory();

	useEffect(() => {
		const redirectTo = new URLSearchParams(history.location.search).get('redirectTo') ?? '/';
		if (isAuth && redirectTo) history.push(redirectTo);
	}, [history.location.search, isAuth]);

	useMessageHandler((state) => state.auth, actions.handleMessage);

	if (isAuth) return null;
	return (
		<div className={styles.container}>
			<Switch>
				<Route path={'/auth/login'} render={() => <LoginPage />} />
				<Route path={'/auth/register'} render={() => <RegisterPage />} />
			</Switch>
		</div>
	);
};

export default AuthPage;
