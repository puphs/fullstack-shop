import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useMessageHandler } from '../../hooks/useMessageHandler';
import { actions } from '../../redux/reducers/authReducer';
import { AppState } from '../../redux/store';
import { routes } from '../../routes';
import styles from './AuthPage.module.scss';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';

const AuthPage: React.FC = () => {
	const token = useSelector((state: AppState) => state.auth.token);

	const history = useHistory();

	useEffect(() => {
		const redirectTo = new URLSearchParams(history.location.search).get('redirectTo') ?? '/';
		if (token && redirectTo) history.push(redirectTo);
	}, [history.location.search, token]);

	useMessageHandler((state) => state.auth, actions.handleMessage);

	return (
		<div className={styles.container}>
			<Switch>
				<Route path={routes.login} render={() => <LoginPage />} />
				<Route path={routes.register} render={() => <RegisterPage />} />
			</Switch>
		</div>
	);
};

export default AuthPage;
