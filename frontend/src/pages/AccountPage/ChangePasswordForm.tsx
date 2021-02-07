import { Field, Form } from 'react-final-form';
import { TFormProps } from '../../types/types';
import {
	composeValidators,
	createMaxLengthValidator,
	createMinLengthValidator,
	createRequireValidator,
} from '../../validators/validators';
import FormInput from '../../components/FormsHelpers/FormInput';
import Button from '../../components/Button/Button';
import { ValidationErrors } from 'final-form';

export type ChangePasswordFormValues = {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
};
const ChangePasswordForm: React.FC<TFormProps<ChangePasswordFormValues>> = ({ onSubmit }) => {
	return (
		<Form
			onSubmit={onSubmit}
			validate={(values) => {
				const errors: ValidationErrors = {};
				if (values.confirmPassword !== values.newPassword)
					errors.confirmPassword = 'Passwords do not match';
				return errors;
			}}
		>
			{({ handleSubmit, invalid }) => (
				<form onSubmit={handleSubmit}>
					<Field
						type={'password'}
						name={'currentPassword'}
						render={(renderProps) => (
							<FormInput inputType={'password'} {...renderProps} fieldName={'Current password'} />
						)}
						validate={createRequireValidator('Current password is required')}
					/>
					<Field
						name={'newPassword'}
						render={(renderProps) => (
							<FormInput inputType={'password'} {...renderProps} fieldName={'New password'} />
						)}
						validate={composeValidators(
							createRequireValidator('New password is required'),
							createMinLengthValidator('Minimum length is 6', 6),
							createMaxLengthValidator('Maximum length is 16', 16)
						)}
					/>
					<Field
						name={'confirmPassword'}
						render={(renderProps) => (
							<FormInput inputType={'password'} {...renderProps} fieldName={'Confirm password'} />
						)}
					/>
					<div>
						<Button type="submit" disabled={invalid} fullWidth style={{ marginTop: 16 }}>
							change password
						</Button>
					</div>
				</form>
			)}
		</Form>
	);
};

export default ChangePasswordForm;
