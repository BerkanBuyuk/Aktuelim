import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Loader from '../Loader';
import {useSelector, useDispatch} from 'react-redux';
import {toggleDarkMode} from '../../redux/store/themeSlice';
import Styles from '../../assets/Styles';

const Ayarlar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.theme.darkMode);

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <View
      style={[
        styles.view_style,
        {
          backgroundColor: darkMode
            ? Styles.dark_bg_color
            : Styles.light_bg_color,
        },
      ]}>
      <TouchableOpacity onPress={handleToggleDarkMode}>
        <Text
          style={{color: darkMode ? Styles.textColor : Styles.dark_text_color}}>
          Tema
        </Text>
      </TouchableOpacity>
      <Loader />
    </View>
  );
};

export default Ayarlar;

const styles = StyleSheet.create({
  view_style: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  lottie_style: {
    width: 300,
    height: 300,
  },
});
