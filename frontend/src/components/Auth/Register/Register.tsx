import AuthPage from '../AuthPage';
import LoginForm from '../Login/LoginForm';
import RegisterForm from './RegisterForm';

const Register: React.FC = () => {
	return (
		<AuthPage
			renderForm={() => <RegisterForm />}
			header={'Register'}
			formMessage={{
				message: 'Already have an account? ',
				messageLinkText: 'Log in!',
				messageLinkPath: '/auth/login',
			}}
		/>
	);
};

export default Register;
