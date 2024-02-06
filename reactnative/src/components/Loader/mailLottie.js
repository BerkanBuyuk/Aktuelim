import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const MailLottie = () => {
  return (
    <LottieView
      className="w-80 h-80"
      source={require('../../assets/lottie/mailLottie/mailLottie.json')}
      autoPlay
    />
  );
};

export default MailLottie;
