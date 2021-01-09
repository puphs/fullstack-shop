import { connect } from 'react-redux';
import { AppState } from '../../redux/store';
import CategoriesNav from './CategoriesNav';

type MapStateProps = ReturnType<typeof mapStateToProps>;
type MapDispatchProps = {};

const CategoriesNavContainer: React.FC<MapStateProps & MapDispatchProps> = (props) => {
	return <CategoriesNav categories={props.categories} />;
};

const mapStateToProps = (state: AppState) => ({
	categories: state.sidebar.categories,
});

export default connect(mapStateToProps, {})(CategoriesNavContainer);
