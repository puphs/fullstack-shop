import LoginForm, { LoginFormValues } from './LoginForm';
import Form from '../../../components/FormsHelpers/Form';
import { useDispatch } from 'react-redux';
import { actions } from '../../../redux/reducers/authReducer';
import { useRedirectTo } from '../../../hooks/useRedirectTo';
import { routes, routeWithRedirectTo } from '../../../routes';

const Login: React.FC = () => {
	const dispatch = useDispatch();
	const redirectTo = useRedirectTo();
	const onSubmit = (values: LoginFormValues) => {
		const { email, password } = values;

		dispatch(actions.login(email, password));
	};

	return (
		<Form
			renderForm={() => <LoginForm onSubmit={onSubmit} />}
			header={'Log in'}
			formMessage={{
				message: "Dont' have an account? ",
				messageLinkText: 'Register!',
				messageLinkPath: routeWithRedirectTo(routes.register, redirectTo),
			}}
		/>
	);
};

export default Login;
