import { GET_LANGUAGE_BY_TAGS, GET_LANGUAGES, GET_LANGUAGE, LANGUAGE_LOADING ,GET_LANGUAGE_FOR_COMP, REMOVE_FROM_COMP} from '../actions/types';

const initialState = {
	languages: [],
	language: {},
	compLanguages:[],
	sum: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_LANGUAGES:
			return {
				...state,
				languages: action.payload.languages,
				sum: action.payload.sum,
				loading: false
			};
		case GET_LANGUAGE:
			return {
				...state,
				language: action.payload,
				loading: false
			};
		case LANGUAGE_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_LANGUAGE_BY_TAGS:
			return {
				...state,
				language: action.payload,
				loading: false
			};
		case GET_LANGUAGE_FOR_COMP:
			return {
				...state,
				//compLanguages:action.payload,
				compLanguages: [...state.compLanguages,action.payload],
				loading: false
			};
		case REMOVE_FROM_COMP:
		return {
			...state,
			compLanguages: state.compLanguages.filter(lang => lang.source !== action.payload),
		};
		default:
			return state;
	}
}
