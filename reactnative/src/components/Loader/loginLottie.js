import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const LoginLottie = () => {
  return (
    <LottieView
      className="w-60 h-60"
      source={require('../../assets/lottie/loginLottie/login.json')}
      autoPlay
    />
  );
};

export default LoginLottie;
