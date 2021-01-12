import styles from './AuthPage.module.scss';
import { Link } from 'react-router-dom';

type Props = {
	renderForm: () => React.ReactElement;
	header?: string;
	formProps?: {};
	formMessage?: {
		message: string;
		messageLinkText: string;
		messageLinkPath: string;
	};
};

const AuthPage: React.FC<Props> = ({ renderForm, header, formMessage }) => {
	return (
		<div className={styles.container}>
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

export default AuthPage;
