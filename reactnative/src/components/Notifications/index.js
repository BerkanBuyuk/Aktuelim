import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Styles from '../../assets/Styles';

const Notifications = () => {
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
      <Text>Notifications</Text>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  view_style: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
