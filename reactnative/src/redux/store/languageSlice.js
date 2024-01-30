import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    language: 'en',
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      console.log(action.payload);
      AsyncStorage.setItem('language', action.payload);
    },
  },
});

//setLanguage async kaydet.

export const {setLanguage} = languageSlice.actions;

export const selectLanguage = state => state.language.language;

export default languageSlice.reducer;
