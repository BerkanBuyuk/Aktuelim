import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {USERS_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingLoader from '../Loader/loadingLoader';
import {useSelector} from 'react-redux';

const UserInfo = () => {
  const [userPicture, setUserPicture] = useState(null);
  const [userNameSurname, setUserNameSurname] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const darkMode = useSelector(state => state.theme.darkMode);

  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
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
  }, [userPicture, userNameSurname, userName]);

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
            <Text
              className={`text-xl font-remRegular font-bold ${
                darkMode ? 'text-textColor' : 'text-baseColor'
              }`}>
              {userNameSurname}
            </Text>
            <Text
              className={`text-sm font-remRegular ${
                darkMode ? 'text-dark_base_color' : 'text-dark_bg_color'
              }`}>{`@${userName}`}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default UserInfo;
