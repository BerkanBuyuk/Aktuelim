import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: false,
  },
  reducers: {
    toggleDarkMode: (state, action) => {
      state.darkMode = action.payload;
      // console.log('Theme: ' + state.darkMode);
      AsyncStorage.setItem('theme', state.darkMode.toString());
    },
  },
});

export const {toggleDarkMode} = themeSlice.actions;
export default themeSlice.reducer;
