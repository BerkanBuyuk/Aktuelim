import {View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const FirstLoader = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <LottieView
        className="w-96 h-96"
        source={require('../../assets/lottie/firstLoader/firstLoader.json')}
        autoPlay
        loop
        speed={2}
      />
    </View>
  );
};

export default FirstLoader;
