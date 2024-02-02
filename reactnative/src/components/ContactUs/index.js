import {View, Text, TextInput, TextBase} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const ContactUs = () => {
  const darkMode = useSelector(state => state.theme.darkMode);
  return (
    <View
      className={`flex-1 items-center justify-center ${
        darkMode ? 'bg-dark_bg_color' : 'bg-light_bg_color'
      }`}>
      <TextInput placeholder="isim soyisim" />
      <TextInput placeholder="mail" />
      <TextInput placeholder="Açıklama" multiline={true} numberOfLines={4} />
    </View>
  );
};

export default ContactUs;
