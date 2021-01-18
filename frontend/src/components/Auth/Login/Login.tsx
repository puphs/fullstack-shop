import LoginForm, { LoginFormValues } from './LoginForm';
import AuthPage from '../AuthPage';
import { useDispatch } from 'react-redux';
import { actions } from '../../../redux/reducers/authReducer';

const Login: React.FC = () => {
	const dispatch = useDispatch();
	const onSubmit = (values: LoginFormValues) => {
		const { email, password } = values;

		dispatch(actions.login(email, password));
	};

	return (
		<AuthPage
			renderForm={() => <LoginForm onSubmit={onSubmit} />}
			header={'Log in'}
			formMessage={{
				message: "Dont' have an account? ",
				messageLinkText: 'Register!',
				messageLinkPath: '/auth/register',
			}}
		/>
	);
};

export default Login;
