import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {USERS_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingLoader from '../Loader/loadingLoader';

const UserInfo = () => {
  const [userPicture, setUserPicture] = useState(null);
  const [userNameSurname, setUserNameSurname] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const user_id = await AsyncStorage.getItem('userId');
        setUserId(user_id);
        const response = await axios.get(`${USERS_URL}/${userId}`);
        setUserPicture(response.data.user_pic);
        setUserNameSurname(response.data.user_name);
        setUserName(response.data.user_username);
        setLoading(false);
      } catch (error) {
        console.log('Hata: ', error);
      }
    };

    getUserDetail();
  }, [userId]);

  return (
    <View className="items-center my-5 flex-row ml-2.5">
      {loading ? (
        <LoadingLoader />
      ) : (
        <View className="items-center my-5 flex-row ml-2.5">
          <View>
            <Image
              source={{uri: userPicture}}
              className="w-24 h-24 rounded-full"
            />
          </View>
          <View className="ml-3">
            <Text className="text-baseColor text-xl">{userNameSurname}</Text>
            <Text className=" text-dark_categories_color text-sm">{`@${userName}`}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default UserInfo;
