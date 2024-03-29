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
      // console.log('Language: ' + action.payload);
      AsyncStorage.setItem('language', action.payload);
    },
  },
});

export const {setLanguage} = languageSlice.actions;
export default languageSlice.reducer;
