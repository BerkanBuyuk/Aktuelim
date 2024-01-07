import {View, StyleSheet} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Loader = () => {
  return (
    <View style={styles.view_style}>
      <LottieView
        style={styles.lottie_style}
        source={require('../../assets/lottie/loader/loader.json')}
        autoPlay
        loop
        speed={10}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  view_style: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // backgroundColor: 'red',
  },
  lottie_style: {
    width: 100,
    height: 100,
  },
});
