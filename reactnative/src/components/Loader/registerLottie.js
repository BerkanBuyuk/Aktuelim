import React from 'react';
import LottieView from 'lottie-react-native';

const LoginLottie = () => {
  return (
    <LottieView
      className="w-64 h-64"
      source={require('../../assets/lottie/registerLottie/registerLottie.json')}
      autoPlay
    />
  );
};

export default LoginLottie;
