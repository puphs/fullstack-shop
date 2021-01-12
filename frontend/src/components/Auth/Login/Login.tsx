import LoginForm from './LoginForm';
import AuthPage from '../AuthPage';

const Login: React.FC = () => {
	return (
		<AuthPage
			renderForm={() => <LoginForm />}
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
