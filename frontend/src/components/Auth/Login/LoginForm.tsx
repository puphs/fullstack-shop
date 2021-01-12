import { Form, Field } from 'react-final-form';
import Button from '../../Button/Button';
import LoginFormInput from '../FormInput';

type Props = {};

type LoginFormValues = {
	email: string;
	password: string;
};

const LoginForm: React.FC<Props> = () => {
	const onSubmit = (values: LoginFormValues) => {
		console.log(values);
	};
	return (
		<Form onSubmit={onSubmit}>
			{({ handleSubmit, invalid }) => (
				<form onSubmit={handleSubmit}>
					<Field
						name={'email'}
						render={(renderProps) => <LoginFormInput {...renderProps} fieldName={'Email'} />}
					/>
					<Field
						name={'password'}
						render={(renderProps) => <LoginFormInput {...renderProps} fieldName={'Password'} />}
					/>
					<div>
						<Button type="submit" fullWidth style={{ marginTop: 16 }}>
							login
						</Button>
					</div>
				</form>
			)}
		</Form>
	);
};
export default LoginForm;
