import { Form, Field } from 'react-final-form';
import {
	composeValidators,
	createEmailValidator,
	createMinLengthValidator,
	createRequireValidator,
} from '../../../validators/validators';
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
						validate={composeValidators(
							createRequireValidator('Email is required'),
							createEmailValidator('Email has incorrect format')
						)}
					/>
					<Field
						name={'password'}
						render={(renderProps) => (
							<LoginFormInput inputType="password" {...renderProps} fieldName={'Password'} />
						)}
						validate={composeValidators(createRequireValidator('Password is required'))}
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
