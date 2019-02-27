import axios from 'axios';
import { URL } from './consts';

import { GET_LANGUAGE_BY_TAGS, GET_LANGUAGE, LANGUAGE_LOADING, GET_LANGUAGES, GET_LANGUAGE_FOR_COMP,REMOVE_FROM_COMP } from './types';

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

export const getTagsByLanguage = (name) => (dispatch) => {
	dispatch(setLanguageLoading());
	axios
		.get(`${URL}/tags/alltags/${name}`)
		.then((result) => {
			dispatch({
				type: GET_LANGUAGE_BY_TAGS,
				payload: result.data[0]
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_LANGUAGE_BY_TAGS,
				payload: null
			});
		});
};

export const getLanguageTags = (Language) => (dispatch) => {
	//console.log("here")
	dispatch(setLanguageLoading());
	axios
		.get(`${URL}/tags/alltags/${Language}`)
		.then((result) => {
			console.log(result.data[0]);
			dispatch({
				type: GET_LANGUAGE_FOR_COMP,
				payload: result.data[0]
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_LANGUAGE_FOR_COMP,
				payload: null
			});
		});
};

export const compareLanguagesByTags = (newComp) => (dispatch) => {
	//console.log("here")
	dispatch(setLanguageLoading());
	axios
		.post(`http://localhost:3000/tags/compare`,newComp)
		.then((result) => {
			console.log(result);
			console.log(result.data);
			
		})
		.catch((err) => {
			console.log(err)
		});
};


export const removeFromComp = (Language) => (dispatch) => {
	//console.log("here")
	//dispatch(setLanguageLoading());
	
			dispatch({
				type: REMOVE_FROM_COMP,
				payload: Language
			});
		
		
};
//set loading state
export const setLanguageLoading = () => {
	return {
		type: LANGUAGE_LOADING
	};
};
