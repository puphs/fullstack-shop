import { Form, Field } from 'react-final-form';
import Button from '../../Button/Button';
import LoginFormInput from '../FormInput';

type Props = {};

type RegisterFormValues = {
	email: string;
	name: string;
	password: string;
	repeatPassword: string;
};

const RegisterForm: React.FC<Props> = () => {
	const onSubmit = (values: RegisterFormValues) => {
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
						name={'name'}
						render={(renderProps) => <LoginFormInput {...renderProps} fieldName={'Name'} />}
					/>
					<Field
						name={'password'}
						render={(renderProps) => <LoginFormInput {...renderProps} fieldName={'Password'} />}
					/>
					<Field
						name={'repeatPassword'}
						render={(renderProps) => (
							<LoginFormInput {...renderProps} fieldName={'Repeat password'} />
						)}
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
export default RegisterForm;
