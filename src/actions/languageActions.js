import axios from 'axios';
import { URL } from './consts';

import {
	GET_LANGUAGE_BY_TAGS,
	GET_LANGUAGE,
	LANGUAGE_LOADING,
	GET_LANGUAGES,
	GET_LANGUAGE_FOR_COMP,
	COMP_RESULTS_LOADING,
	GET_COMP_RESULTS,
	REMOVE_FROM_COMP,
	COMP_LANGUAGE_LOADING,
	COMP_BY_YEAR,
	COMP_BY_YEAR_LOADING
} from './types';

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
	dispatch(setCompLanguageLoading());
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
	console.log(newComp);
	dispatch(setCompResultsLoading());
	axios
		.post(`${URL}/tags/compare`, newComp)
		.then((result) => {
			// console.log(result.data);
			dispatch({
				type: GET_COMP_RESULTS,
				payload: result.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_COMP_RESULTS,
				payload: null
			});
		});
};

export const compareByYears = (data) => (dispatch) => {
	console.log('here');

	dispatch(setCompByYearLoading());
	axios
		.post(`${URL}/tags/compare/compareLanguagesByTagsByYear`, data)
		.then((result) => {
			// console.log(result.data);
			dispatch({
				type: COMP_BY_YEAR,
				payload: result.data
			});
		})
		.catch((err) => {
			dispatch({
				type: COMP_BY_YEAR,
				payload: null
			});
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

export const setCompLanguageLoading = () => {
	return {
		type: COMP_LANGUAGE_LOADING
	};
};
export const setCompByYearLoading = () => {
	return {
		type: COMP_BY_YEAR_LOADING
	};
};
export const setCompResultsLoading = () => {
	return {
		type: COMP_RESULTS_LOADING
	};
};
