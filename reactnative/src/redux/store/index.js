import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: rootReducer,
  },
});

export default store;
