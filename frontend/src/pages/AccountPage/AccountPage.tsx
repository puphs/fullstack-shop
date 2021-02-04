import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Form from '../../components/FormsHelpers/Form';
import { actions } from '../../redux/reducers/authReducer';
import { AppState } from '../../redux/store';
import { routes, routeWithRedirectTo } from '../../routes';
import styles from './AccountPage.module.scss';
import ChangeNameForm from './ChangeNameForm';
import ChangePasswordForm from './ChangePasswordForm';

const AccountPage = () => {
	const token = useSelector((state: AppState) => state.auth.token);

	const dispatch = useDispatch();

	const onLogoutBtnClick = () => {
		dispatch(actions.logout());
	};

	if (!token) {
		return <Redirect to={routeWithRedirectTo(routes.login, routes.account)} />;
	}

	return (
		<div className={styles.accountContainer}>
			<h3 className={styles.greeting}>
				Hello, <span className={styles.userName}>anonymous</span>
			</h3>
			<div className={styles.loginLogout}>
				{token ? (
					<button className={styles.logout} onClick={onLogoutBtnClick}>
						logout
					</button>
				) : (
					<Link className={styles.login} to={routeWithRedirectTo(routes.login, routes.account)}>
						login
					</Link>
				)}
			</div>
			{token && (
				<div className={styles.forms}>
					<Forms />
				</div>
			)}
		</div>
	);
};

const Forms = () => {
	const onChangeNameSubmit = () => {};

	return (
		<>
			<Form
				header={'Change name'}
				renderForm={() => <ChangeNameForm onSubmit={onChangeNameSubmit} />}
			/>
			<Form
				style={{ marginLeft: 32 }}
				header={'Change password'}
				renderForm={() => <ChangePasswordForm onSubmit={onChangeNameSubmit} />}
			/>
		</>
	);
};

export default AccountPage;
