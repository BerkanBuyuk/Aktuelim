import {View, StyleSheet} from 'react-native';
import React from 'react';
import Theme from '../Theme';
import {useSelector} from 'react-redux';
import Styles from '../../assets/Styles';

const Ayarlar = () => {
  const darkMode = useSelector(state => state.theme.darkMode);
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
      <Theme />
    </View>
  );
};

export default Ayarlar;

const styles = StyleSheet.create({
  view_style: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
});
