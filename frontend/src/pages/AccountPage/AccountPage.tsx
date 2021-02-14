import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Form from '../../components/FormsHelpers/Form';
import { authActions } from '../../redux/reducers/authReducer';
import { accountActions } from '../../redux/reducers/accountReducer';
import { AppState } from '../../redux/store';
import { routes, routeWithRedirectTo } from '../../routes';
import styles from './AccountPage.module.scss';
import ChangeNameForm, { ChangeNameFormValues } from './ChangeNameForm';
import ChangePasswordForm, { ChangePasswordFormValues } from './ChangePasswordForm';

const AccountPage = () => {
	const token = useSelector((state: AppState) => state.auth.token);
	const account = useSelector((state: AppState) => state.account.account);

	const dispatch = useDispatch();

	const onLogoutBtnClick = () => {
		dispatch(authActions.logout());
	};

	if (!token) {
		return <Redirect to={routeWithRedirectTo(routes.login, routes.account)} />;
	}

	return (
		<div className={styles.accountContainer}>
			<h3 className={styles.greeting}>
				Hello, <span className={styles.userName}>{account?.name}</span>
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
	const dispatch = useDispatch();
	const token = useSelector((state: AppState) => state.auth.token);
	const onChangeNameSubmit = (values: ChangeNameFormValues) => {
		if (token) {
			dispatch(accountActions.changeName(token, values.name));
		}
	};
	const onChangePasswordSubmit = (values: ChangePasswordFormValues) => {
		if (token) {
			dispatch(accountActions.changePassword(token, values.currentPassword, values.newPassword));
		}
	};

	return (
		<>
			<div className={styles.changeNameForm}>
				<Form
					header={'Change name'}
					renderForm={() => <ChangeNameForm onSubmit={onChangeNameSubmit} />}
				/>
			</div>
			<div className={styles.changePasswordForm}>
				<Form
					header={'Change password'}
					renderForm={() => <ChangePasswordForm onSubmit={onChangePasswordSubmit} />}
				/>
			</div>
		</>
	);
};

export default AccountPage;
