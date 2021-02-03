import styles from './OopsPage.module.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import qs from 'query-string';

export const NOT_LOGGED_IN = 'not-logged-in';
export const PAGE_NOT_FOUND = 'page-not-found';

const OopsPage: React.FC = () => {
	const { oopsReason } = useParams<{ oopsReason: string }>();
	const { redirectTo } = qs.parse(useLocation().search);

	let ReasonElement = <PageNotFound />;

	switch (oopsReason) {
		case NOT_LOGGED_IN:
			ReasonElement = <NotLoggedIn redirectTo={redirectTo?.toString() ?? '/'} />;
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

const NotLoggedIn: React.FC<{ redirectTo: string }> = ({ redirectTo }) => {
	return (
		<div className={styles.notLoggedIn}>
			<p className={styles.p}>
				You are not logged in!{' '}
				<Link className={styles.reasonLink} to={`/auth/login?redirectTo=${redirectTo}`}>
					Login!
				</Link>
			</p>
			<p className={styles.p}>or</p>
			<p className={styles.p}>
				If you don’t have an account,{' '}
				<Link className={styles.reasonLink} to={`/auth/register?redirectTo=${redirectTo}`}>
					Register!
				</Link>
			</p>
		</div>
	);
};

export default OopsPage;
