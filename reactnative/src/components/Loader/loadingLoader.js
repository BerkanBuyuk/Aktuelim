import {View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const LoadingLoader = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <LottieView
        className="w-48 h-48"
        source={require('../../assets/lottie/loadingLoader/loadingLoader.json')}
        autoPlay
        loop
        speed={2}
      />
    </View>
  );
};

export default LoadingLoader;
