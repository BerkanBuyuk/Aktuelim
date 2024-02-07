import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {USERS_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserInfo = () => {
  const [userData, setUserData] = useState();

  const getUsers = async url => {
    try {
      const usersToken = await AsyncStorage.getItem('accessToken');

      if (usersToken) {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${usersToken}`,
          },
        });
        console.log(response.data[1].user_email);
      }

      // setUserData(response.data);
    } catch (error) {
      console.log('Hata: ', error);
    }
  };

  useEffect(() => {
    getUsers(USERS_URL);
  }, []);

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
