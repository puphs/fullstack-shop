import { useDispatch } from 'react-redux';
import { actions } from '../../../redux/reducers/authReducer';
import Form from '../../../components/FormsHelpers/Form';
import RegisterForm, { RegisterFormValues } from './RegisterForm';
import { routes, routeWithRedirectTo } from '../../../routes';
import { useRedirectTo } from '../../../hooks/useRedirectTo';

const Register: React.FC = () => {
	const dispatch = useDispatch();
	const redirectTo = useRedirectTo();

	const onSubmit = (values: RegisterFormValues) => {
		const { email, name, password } = values;
		dispatch(actions.register(email, name, password));
	};

	return (
		<Form
			renderForm={() => <RegisterForm onSubmit={onSubmit} />}
			header={'Register'}
			formMessage={{
				message: 'Already have an account? ',
				messageLinkText: 'Log in!',
				messageLinkPath: routeWithRedirectTo(routes.login, redirectTo),
			}}
		/>
	);
};

export default Register;
