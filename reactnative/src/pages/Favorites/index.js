import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Favorites = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        // backgroundColor: 'red',
      }}>
      <LottieView
        style={{width: 300, height: 300}}
        source={require('../../assets/lottie/loader/loader.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default Favorites;
