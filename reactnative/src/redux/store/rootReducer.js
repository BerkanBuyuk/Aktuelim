import {combineReducers} from 'redux';
import languageReducer from './languageSlice';

const rootReducer = combineReducers({
  language: languageReducer,
  // Diğer slicer'ları da ekleyebilirsiniz
});

export default rootReducer;
