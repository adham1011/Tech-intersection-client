import axios from 'axios';
import { URL } from './consts';

import { GET_LANGUAGE, LANGUAGE_LOADING, GET_LANGUAGES } from './types';

//gets Languages
export const getLanguages = () => (dispatch) => {
	dispatch(setLanguageLoading());
	axios
		.get(`${URL}/languages`)
		.then((result) => {
			dispatch({
				type: GET_LANGUAGES,
				payload: result.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_LANGUAGES,
				payload: { message: 'cant get langs' }
			});
		});
};

//gets Language
export const getLanguage = (id) => (dispatch) => {
	dispatch(setLanguageLoading());
	axios
		.get(`${URL}/languages/${id}`)
		.then((result) => {
			dispatch({
				type: GET_LANGUAGE,
				payload: result.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_LANGUAGE,
				payload: null
			});
		});
};

//set loading state

export const setLanguageLoading = () => {
	return {
		type: LANGUAGE_LOADING
	};
};

// //clear errors
// export const clearErrors = () => {
// 	return {
// 		type: CLEAR_ERRORS
// 	};
// };
