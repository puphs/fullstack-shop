import { ValidationErrors } from 'final-form';
import { Form, Field } from 'react-final-form';
import {
	composeValidators,
	createEmailValidator,
	createMaxLengthValidator,
	createRequireValidator,
} from '../../../validators/validators';
import Button from '../../Button/Button';
import LoginFormInput from '../FormInput';

type Props = {};

type RegisterFormValues = {
	email: string;
	name: string;
	password: string;
	confirmPassword: string;
};

const RegisterForm: React.FC<Props> = () => {
	const onSubmit = (values: RegisterFormValues) => {
		console.log(values);
	};
	return (
		<Form
			onSubmit={onSubmit}
			validate={(values) => {
				const errors: ValidationErrors = {};
				if (values.confirmPassword !== values.password)
					errors.confirmPassword = 'Passwords do not match';
				return errors;
			}}
		>
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
						name={'name'}
						render={(renderProps) => (
							<LoginFormInput
								{...renderProps}
								fieldName={'Name'}
								validate={composeValidators(
									createRequireValidator('Name is required'),
									createMaxLengthValidator('Max Name length is 12', 12)
								)}
							/>
						)}
					/>
					<Field
						name={'password'}
						render={(renderProps) => (
							<LoginFormInput {...renderProps} fieldName={'Password'} inputType={'password'} />
						)}
					/>
					<Field
						name={'confirmPassword'}
						render={(renderProps) => (
							<LoginFormInput
								{...renderProps}
								fieldName={'Confirm password'}
								inputType={'password'}
							/>
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
