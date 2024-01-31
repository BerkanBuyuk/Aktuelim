import {View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Loader = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <LottieView
        className="w-28 h-28"
        source={require('../../assets/lottie/loader/loader.json')}
        autoPlay
        loop
        speed={3}
      />
    </View>
  );
};

export default Loader;
