import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import styles from './AccountPage.module.scss';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { actions } from '../../redux/reducers/authReducer';
import Form from '../../components/FormsHelpers/Form';
import ChangeNameForm from './ChangeNameForm';
import ChangePasswordForm from './ChangePasswordForm';
import { useNotLoggedInRedirect } from '../../hooks/useNotLoggedInRedirect';
import { useEffect } from 'react';

const AccountPage = () => {
	const token = useSelector((state: AppState) => state.auth.token);

	const dispatch = useDispatch();
	const history = useHistory();

	// useNotLoggedInRedirect('/account');
	// useEffect(() => {
	// 	if (!token) {
	// 		history.push('/auth/login?redirectTo=/account');
	// 	}
	// }, [token]);

	const onLogoutBtnClick = () => {
		// history.push('/');
		dispatch(actions.logout());
	};
	if (!token) {
		return <Redirect to={'/auth/login?redirectTo=/account'} />;
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
					<Link className={styles.login} to={'/auth/login?redirectTo=/account'}>
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
