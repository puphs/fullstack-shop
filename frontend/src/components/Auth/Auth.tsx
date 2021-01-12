import { Route, Switch } from 'react-router-dom';
import styles from './Auth.module.scss';
import Login from './Login/Login';
import Register from './Register/Register';

const Auth: React.FC = () => {
	return (
		<div className={styles.container}>
			<Switch>
				<Route path={'/auth/login'} render={() => <Login />} />
				<Route path={'/auth/register'} render={() => <Register />} />
				{/* <Route path={'/auth/login'} render={() => <Login />} /> */}
			</Switch>
		</div>
	);
};

export default Auth;
