import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {USERS_URL, CLOUDINARY_PIC_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserInfo = () => {
  const [userPicture, setUserPicture] = useState(null);
  const [userNameSurname, setUserNameSurname] = useState(null);
  const [userName, setUserName] = useState(null);
  // const userPicture = AsyncStorage.getItem('userPicture');

  useEffect(() => {
    const getUserPicture = async () => {
      try {
        const pictureUri = await AsyncStorage.getItem('userPicture');
        setUserPicture(pictureUri);
        const nameSurnameText = await AsyncStorage.getItem('userNameSurname');
        setUserNameSurname(nameSurnameText);
        const userNameText = await AsyncStorage.getItem('userName');
        setUserName(userNameText);
      } catch (error) {
        console.log('Hata: ', error);
      }
    };

    getUserPicture();
  }, []);

  // const getUsers = async url => {
  //   try {
  //   } catch (error) {
  //     console.log('Hata: ', error);
  //   }
  // };
  // useEffect(() => {
  //   getUsers(USERS_URL);
  // }, []);

  return (
    <View className="items-center my-5 flex-row ml-2.5">
      <View>
        <Image source={{uri: userPicture}} className="w-24 h-24 rounded-full" />
      </View>
      <View className="ml-3">
        <Text className="text-baseColor text-xl">{userNameSurname}</Text>
        <Text className=" text-dark_categories_color text-sm">{`@${userName}`}</Text>
      </View>
    </View>
  );
};

export default UserInfo;
