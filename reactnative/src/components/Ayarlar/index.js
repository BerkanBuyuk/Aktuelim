import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import Loader from '../Loader';

const Ayarlar = () => {
  return (
    <View style={styles.view_style}>
      <Text>Ayarlar</Text>
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
    // backgroundColor: 'red',
  },
  lottie_style: {
    width: 300,
    height: 300,
  },
});
