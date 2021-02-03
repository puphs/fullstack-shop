import { ValidationErrors } from 'final-form';
import { Field, Form } from 'react-final-form';
import { TFormProps } from '../../../types/types';
import {
	composeValidators,
	createEmailValidator,
	createMaxLengthValidator,
	createMinLengthValidator,
	createRequireValidator,
} from '../../../validators/validators';
import Button from '../../../components/Button/Button';
import LoginFormInput from '../../../components/FormsHelpers/FormInput';

export type RegisterFormValues = {
	email: string;
	name: string;
	password: string;
	confirmPassword: string;
};

const RegisterForm: React.FC<TFormProps<RegisterFormValues>> = ({ onSubmit }) => {
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
				<form onSubmit={handleSubmit} autoComplete="off">
					<Field
						name={'email'}
						render={(renderProps) => (
							<LoginFormInput {...renderProps} autoComplete={'email'} fieldName={'Email'} />
						)}
						validate={composeValidators(
							createRequireValidator('Email is required'),
							createEmailValidator('Email has incorrect format')
						)}
					/>
					<Field
						name={'name'}
						render={(renderProps) => (
							<LoginFormInput {...renderProps} fieldName={'Name'} autoComplete="off" />
						)}
						validate={composeValidators(
							createRequireValidator('Name is required'),
							createMaxLengthValidator('Maximum length is 12', 12)
						)}
					/>
					<Field
						name={'password'}
						render={(renderProps) => (
							<LoginFormInput
								{...renderProps}
								autoComplete="off"
								fieldName={'Password'}
								inputType={'password'}
							/>
						)}
						validate={composeValidators(
							createRequireValidator('Password is required'),
							createMinLengthValidator('Minimum length is 6', 6),
							createMaxLengthValidator('Maximum length is 16', 16)
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
						<Button type="submit" disabled={invalid} fullWidth style={{ marginTop: 16 }}>
							register
						</Button>
					</div>
				</form>
			)}
		</Form>
	);
};
export default RegisterForm;
