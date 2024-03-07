import {configureStore} from '@reduxjs/toolkit';
import themeReducer from '../slice/themeSlice';
import languageReducer from '../slice/languageSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
  },
});

export default store;
