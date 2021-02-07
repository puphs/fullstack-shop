import { Field, Form } from 'react-final-form';
import { TFormProps } from '../../types/types';
import { createRequireValidator } from '../../validators/validators';
import FormInput from '../../components/FormsHelpers/FormInput';
import Button from '../../components/Button/Button';

export type ChangeNameFormValues = {
	name: string;
};
const ChangeNameForm: React.FC<TFormProps<ChangeNameFormValues>> = ({ onSubmit }) => {
	return (
		<Form onSubmit={onSubmit}>
			{({ handleSubmit, invalid }) => (
				<form onSubmit={handleSubmit}>
					<Field
						name={'name'}
						render={(renderProps) => <FormInput {...renderProps} fieldName={'Name'} />}
						validate={createRequireValidator('Name is required')}
					/>
					<div>
						<Button type="submit" disabled={invalid} fullWidth style={{ marginTop: 16 }}>
							change name
						</Button>
					</div>
				</form>
			)}
		</Form>
	);
};

export default ChangeNameForm;
