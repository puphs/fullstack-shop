import { Link, useLocation } from 'react-router-dom';
import { useRedirectTo } from '../../hooks/useRedirectTo';
import { routes, routeWithRedirectTo } from '../../routes';
import styles from './OopsPage.module.scss';

const OopsPage: React.FC = () => {
	const location = useLocation();
	const redirectTo = useRedirectTo();

	let ReasonElement = <PageNotFound />;

	switch (location.pathname) {
		case routes.notLoggedIn:
			ReasonElement = <NotLoggedIn redirectTo={redirectTo} />;
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
				<Link className={styles.reasonLink} to={routes.catalog}>
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
				<Link className={styles.reasonLink} to={routeWithRedirectTo(routes.login, redirectTo)}>
					Login!
				</Link>
			</p>
			<p className={styles.p}>or</p>
			<p className={styles.p}>
				If you don’t have an account,{' '}
				<Link className={styles.reasonLink} to={routeWithRedirectTo(routes.register, redirectTo)}>
					Register!
				</Link>
			</p>
		</div>
	);
};

export default OopsPage;
