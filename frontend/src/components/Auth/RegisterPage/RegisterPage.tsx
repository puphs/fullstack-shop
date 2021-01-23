import { useDispatch } from 'react-redux';
import { actions } from '../../../redux/reducers/authReducer';
import Auth from '../Auth';
import RegisterForm, { RegisterFormValues } from './RegisterForm';

const Register: React.FC = () => {
	const dispatch = useDispatch();
	const onSubmit = (values: RegisterFormValues) => {
		const { email, name, password } = values;
		dispatch(actions.register(email, name, password));
	};

	return (
		<Auth
			renderForm={() => <RegisterForm onSubmit={onSubmit} />}
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
