import React from 'react';
import LottieView from 'lottie-react-native';

const DarkCommentLottie = () => {
  return (
    <LottieView
      className="w-6 h-6"
      source={require('../../assets/lottie/darkCommentLottie/darkCommentLottie.json')}
      autoPlay
      loop
    />
  );
};

export default DarkCommentLottie;
