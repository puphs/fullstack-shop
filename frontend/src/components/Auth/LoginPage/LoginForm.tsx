import { Form, Field } from 'react-final-form';
import { TFormProps } from '../../../types/types';
import {
	composeValidators,
	createEmailValidator,
	createRequireValidator,
} from '../../../validators/validators';
import Button from '../../Button/Button';
import LoginFormInput from '../FormInput';

export type LoginFormValues = {
	email: string;
	password: string;
};

const LoginForm: React.FC<TFormProps<LoginFormValues>> = ({ onSubmit }) => {
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
						<Button type="submit" disabled={invalid} fullWidth style={{ marginTop: 16 }}>
							login
						</Button>
					</div>
				</form>
			)}
		</Form>
	);
};
export default LoginForm;
