import styles from './Form.module.scss';
import { Link } from 'react-router-dom';
import { CSSProperties, StyleHTMLAttributes } from 'react';

type Props = {
	renderForm: () => React.ReactElement;
	header?: string;
	formProps?: {};
	formMessage?: {
		message: string;
		messageLinkText: string;
		messageLinkPath: string;
	};
	style?: CSSProperties;
};

const Form: React.FC<Props> = ({ renderForm, header, formMessage, style }) => {
	return (
		<div style={style ?? {}}>
			<h4 className={styles.formHeader}>{header}</h4>
			<div className={styles.form}>{renderForm()}</div>
			<h6 className={styles.formMessage}>
				{formMessage && (
					<>
						{formMessage.message}
						<Link className={styles.formMessageLink} to={formMessage.messageLinkPath}>
							{formMessage.messageLinkText}
						</Link>
					</>
				)}
			</h6>
		</div>
	);
};

export default Form;
