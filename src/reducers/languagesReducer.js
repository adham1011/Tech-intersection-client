import {
  GET_LANGUAGE_BY_TAGS,
  GET_LANGUAGES,
  GET_LANGUAGE,
  LANGUAGE_LOADING,
  GET_LANGUAGE_FOR_COMP,
  COMP_LANGUAGE_LOADING,
  REMOVE_FROM_COMP,
  COMP_RESULTS_LOADING,
  GET_COMP_RESULTS
} from "../actions/types";

const initialState = {
  languages: [],
  language: {},
  compLanguages: [],
  sum: {},
  loading: false,
  compLoading: false,
  compResults: {},
  resultsLoading: false
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
	  //results
    case GET_COMP_RESULTS:
      return {
        ...state,
        compResults: action.payload,
        resultsLoading: false
      };
    case COMP_RESULTS_LOADING:
      return {
        ...state,
        resultsLoading: true
	  };
	  
    case LANGUAGE_LOADING:
      return {
        ...state,
        loading: true
      };
    case COMP_LANGUAGE_LOADING:
      return {
        ...state,
        compLoading: true
      };
    case GET_LANGUAGE_BY_TAGS:
      return {
        ...state,
        language: action.payload,
        compLoading: false
      };
    case GET_LANGUAGE_FOR_COMP:
      return {
        ...state,
        //compLanguages:action.payload,
        compLanguages: [...state.compLanguages, action.payload],
        compLoading: false
      };
    case REMOVE_FROM_COMP:
      return {
        ...state,
        compLanguages: state.compLanguages.filter(
          lang => lang.source !== action.payload
        )
      };
    default:
      return state;
  }
}
