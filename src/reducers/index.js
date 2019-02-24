import { combineReducers } from 'redux';
import languagesReducer from './languagesReducer';

export default combineReducers({
	languages: languagesReducer
});
