import {View} from 'react-native';
import React from 'react';
import Theme from '../../assets/Theme';
import {useSelector} from 'react-redux';
import Language from '../../assets/Language';

const Settings = () => {
  const darkMode = useSelector(state => state.theme.darkMode);
  return (
    <View
      className={`flex-1 p-6 ${
        darkMode ? 'bg-dark_bg_color' : 'bg-light_bg_color'
      }`}>
      <Theme />
      <Language />
    </View>
  );
};

export default Settings;
