import { combineReducers } from 'redux';
// import errorReducer from './errorReducer';
import languagesReducer from './languagesReducer';

export default combineReducers({
	// errors: errorReducer,
	languages: languagesReducer
});
