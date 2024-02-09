import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Styles from '../../assets/Styles';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Divider from '../Divider';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';

const SettingsUserInfo = ({navigation}) => {
  const darkMode = useSelector(state => state.theme.darkMode);
  const {t} = useTranslation();

  const [userPicture, setUserPicture] = useState(null);
  const [userNameSurname, setUserNameSurname] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const pictureUri = await AsyncStorage.getItem('userPicture');
        setUserPicture(pictureUri);
        const nameSurnameText = await AsyncStorage.getItem('userNameSurname');
        setUserNameSurname(nameSurnameText);
        const userNameText = await AsyncStorage.getItem('userName');
        setUserName(userNameText);
        const userEmailText = await AsyncStorage.getItem('userEmail');
        setUserEmail(userEmailText);
      } catch (error) {
        console.log('Hata: ', error);
      }
    };

    getUserDetail();
  }, []);

  return (
    <SafeAreaView
      className={`flex-1 ${
        darkMode ? 'bg-dark_bg_color' : 'bg-light_bg_color'
      }`}>
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={40}
              color={darkMode ? Styles.textColor : Styles.dark_text_color}
            />
          </TouchableOpacity>
        </View>
        <View className="flex-1 items-center">
          <Text
            className={`text-2xl text-center font-bold ${
              darkMode ? 'text-textColor' : 'text-dark_text_color'
            }`}>
            {t('Settings.settings_account_title')}
          </Text>
        </View>
        <View className="flex-1" />
      </View>
      <View className="justify-center">
        <View className="flex-row mx-5 mt-14">
          <View className="flex-1 justify-center">
            <Text
              className={`text-xl ${
                darkMode ? 'text-textColor' : 'text-dark_text_color'
              }`}>
              {t('Account_settings.photo')}
            </Text>
          </View>
          <View className="flex-1 items-center">
            <Image
              source={{uri: userPicture}}
              className="w-32 h-32 rounded-full"
            />
          </View>
          <View className="flex-1 items-end justify-center" />
        </View>
        <View className="mx-5 my-5">{/* <Divider /> */}</View>
        <View className="flex-row mx-5 items-center my-5">
          <View className="flex-1 justify-center">
            <Text
              className={`text-xl ${
                darkMode ? 'text-textColor' : 'text-dark_text_color'
              }`}>
              {t('Account_settings.nameSurname')}
            </Text>
          </View>
          <View className="flex-1 items-center">
            <Text
              className={`text-lg text-center ${
                darkMode ? 'text-textColor' : 'text-dark_text_color'
              }`}>
              {userNameSurname}
            </Text>
          </View>
          <View className="flex-1 items-end justify-center">
            <TouchableOpacity onPress={null}>
              <FontAwesome
                name="edit"
                size={30}
                color={darkMode ? Styles.textColor : Styles.dark_text_color}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="mx-5">
          <Divider />
        </View>
        <View className="flex-row mx-5 items-center my-5">
          <View className="flex-1 justify-center">
            <Text
              className={`text-xl ${
                darkMode ? 'text-textColor' : 'text-dark_text_color'
              }`}>
              {t('Account_settings.userName')}
            </Text>
          </View>
          <View className="flex-1 items-center">
            <Text
              className={`text-lg text-center ${
                darkMode ? 'text-textColor' : 'text-dark_text_color'
              }`}>
              {userName}
            </Text>
          </View>
          <View className="flex-1 items-end justify-center">
            <TouchableOpacity onPress={null}>
              <FontAwesome
                name="edit"
                size={30}
                color={darkMode ? Styles.textColor : Styles.dark_text_color}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="mx-5">
          <Divider />
        </View>
        <View className="flex-row mx-5 items-center my-5">
          <View className="flex-1 justify-center">
            <Text
              className={`text-xl ${
                darkMode ? 'text-textColor' : 'text-dark_text_color'
              }`}>
              {t('Account_settings.email')}
            </Text>
          </View>
          <View className="flex-1 items-center">
            <Text
              className={`text-lg text-center ${
                darkMode ? 'text-textColor' : 'text-dark_text_color'
              }`}>
              {userEmail}
            </Text>
          </View>
          <View className="flex-1">
            {/* <TouchableOpacity onPress={null}>
            <FontAwesome
              name="edit"
              size={30}
              color={darkMode ? Styles.textColor : Styles.dark_text_color}
            />
          </TouchableOpacity> */}
          </View>
        </View>
        <View className="mx-5">
          <Divider />
        </View>
        <View className="flex-row mx-5 items-center my-5">
          <View className="flex-1 justify-center">
            <Text
              className={`text-xl ${
                darkMode ? 'text-textColor' : 'text-dark_text_color'
              }`}>
              {t('Account_settings.password')}
            </Text>
          </View>
          <View className="flex-1 items-center">
            <Text
              className={`text-lg text-center ${
                darkMode ? 'text-textColor' : 'text-dark_text_color'
              }`}>
              ************
            </Text>
          </View>
          <View className="flex-1 items-end justify-center">
            <TouchableOpacity onPress={null}>
              <FontAwesome
                name="edit"
                size={30}
                color={darkMode ? Styles.textColor : Styles.dark_text_color}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsUserInfo;
