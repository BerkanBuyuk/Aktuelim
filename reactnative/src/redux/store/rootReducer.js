import {combineReducers} from 'redux';
import languageReducer from './languageSlice';

const rootReducer = combineReducers({
  language: languageReducer,
});

export default rootReducer;
