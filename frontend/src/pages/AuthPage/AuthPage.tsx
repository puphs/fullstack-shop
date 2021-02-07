import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useMessageHandler } from '../../hooks/useMessageHandler';
import { useRedirectTo } from '../../hooks/useRedirectTo';
import { authActions } from '../../redux/reducers/authReducer';
import { AppState } from '../../redux/store';
import { routes } from '../../routes';
import styles from './AuthPage.module.scss';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';

const AuthPage: React.FC = () => {
	const token = useSelector((state: AppState) => state.auth.token);
	const redirectTo = useRedirectTo();

	const history = useHistory();

	useEffect(() => {
		if (token) {
			history.push(redirectTo);
		}
	}, [token]);

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
