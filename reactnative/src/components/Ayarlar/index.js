import {View, StyleSheet} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Ayarlar = () => {
  return (
    <View style={styles.view_style}>
      <LottieView
        style={styles.lottie_style}
        source={require('../../assets/lottie/loader/loader.json')}
        autoPlay
        loop
      />
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
