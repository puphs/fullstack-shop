import styles from './OopsPage.module.scss';
import { Link, useParams } from 'react-router-dom';

const NOT_LOGGED_IN = 'not-logged-in';
const PAGE_NOT_FOUND = 'page-not-found';

const OopsPage: React.FC = () => {
	const { oopsReason } = useParams<{ oopsReason: string }>();

	let ReasonElement = <PageNotFound />;

	switch (oopsReason) {
		case NOT_LOGGED_IN:
			ReasonElement = <NotLoggedIn />;
			break;
	}

	return (
		<div className={styles.oopsContainer}>
			<h1 className={styles.oops}>Oops...</h1>
			<div className={styles.reason}>{ReasonElement}</div>
		</div>
	);
};

const PageNotFound = () => {
	return (
		<div className={styles.notFound}>
			<p className={styles.p}>
				Page is not found!{' '}
				<Link className={styles.reasonLink} to={'/'}>
					Let's get out of here!
				</Link>
			</p>
		</div>
	);
};

const NotLoggedIn = () => {
	return (
		<div className={styles.notLoggedIn}>
			<p className={styles.p}>
				You are not logged in!{' '}
				<Link className={styles.reasonLink} to={'/auth/register'}>
					Login!
				</Link>
			</p>
			<p className={styles.p}>or</p>
			<p className={styles.p}>
				If you don’t have an account,{' '}
				<Link className={styles.reasonLink} to={'/auth/register'}>
					Register!
				</Link>
			</p>
		</div>
	);
};

export default OopsPage;
