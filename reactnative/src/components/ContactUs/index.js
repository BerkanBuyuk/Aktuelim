import {View, Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const ContactUs = () => {
  const darkMode = useSelector(state => state.theme.darkMode);
  return (
    <View
      className={`flex-1 items-center justify-center ${
        darkMode ? 'bg-dark_bg_color' : 'bg-light_bg_color'
      }`}>
      <Text>ContactUs</Text>
    </View>
  );
};

export default ContactUs;
