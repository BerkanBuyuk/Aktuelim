import {View, Text, Image} from 'react-native';
import React from 'react';
import axios from 'axios';

const UserInfo = () => {
  return (
    <View className="items-center my-5">
      <Image
        source={require('../../assets/Images/google.png')}
        className="w-28 h-28 rounded-3xl"
      />
    </View>
  );
};

export default UserInfo;
