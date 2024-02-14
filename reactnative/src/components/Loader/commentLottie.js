import {View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const CommentLottie = () => {
  return (
    <LottieView
      className="w-6 h-6"
      source={require('../../assets/lottie/commentLottie/commentLottie.json')}
      autoPlay
      loop
    />
  );
};

export default CommentLottie;
