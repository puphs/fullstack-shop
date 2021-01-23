import { Route, Switch } from 'react-router-dom';
import styles from './AuthPage.module.scss';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';

const AuthPage: React.FC = () => {
	return (
		<div className={styles.container}>
			<Switch>
				<Route path={'/auth/login'} render={() => <LoginPage />} />
				<Route path={'/auth/register'} render={() => <RegisterPage />} />
				{/* <Route path={'/auth/login'} render={() => <Login />} /> */}
			</Switch>
		</div>
	);
};

export default AuthPage;
