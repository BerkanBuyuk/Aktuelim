import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Styles from '../../assets/Styles';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Divider from '../Divider';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Modal from 'react-native-modal';
import axios from 'axios';
import {useToast} from 'react-native-toast-notifications';
import {USERS_URL} from '@env';

const SettingsUserInfo = ({navigation}) => {
  const darkMode = useSelector(state => state.theme.darkMode);
  const {t} = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const toast = useToast();
  const [userId, setUserId] = useState(57);

  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const user_id = await AsyncStorage.getItem('userId');
        setUserId(user_id);
      } catch (error) {
        console.log('Hata: ', error);
      }
    };

    getUserDetail();
  }, [userId]);

  const getUser = async () => {
    try {
      const response = await axios.get(`${USERS_URL}/${userId}`);
      console.log(response.data);
    } catch (error) {}
  };

  const updateUser = async () => {
    try {
      const data = {
        user_id: userId,
        user_username: 'naruto',
        user_name: 'uzumaki',
        user_pic: 'dattebayo',
      };
      await axios.put(`${USERS_URL}/${userId}`, data);
      toggleModal();
      toast.show(`${userId} güncellendi.`, {type: 'success'});
    } catch (error) {
      console.log(error);
      toast.show(`${userId} güncellenirken hata oluştu.`, {
        type: 'danger',
      });
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
          <View className="flex-1 justify-center" />
          <View className="flex-1 items-center">
            <Image source={{uri: null}} className="w-32 h-32 rounded-full" />
          </View>
          <View className="flex-1 items-end justify-center" />
        </View>
        <View className="mx-5 my-5" />
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
              {null}
            </Text>
          </View>
          <View className="flex-1 items-end justify-center" />
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
              {null}
            </Text>
          </View>
          <View className="flex-1 items-end justify-center" />
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
              {null}
            </Text>
          </View>
          <View className="flex-1" />
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
              {/* ************ */}
              {userId}
            </Text>
          </View>
          <View className="flex-1 items-end justify-center" />
        </View>
        <View className="items-center mt-2.5">
          <TouchableOpacity onPress={toggleModal}>
            <FontAwesome
              name="edit"
              size={40}
              color={darkMode ? Styles.textColor : Styles.dark_text_color}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={getUser}>
            <FontAwesome
              name="close"
              size={40}
              color={darkMode ? Styles.textColor : Styles.dark_text_color}
            />
          </TouchableOpacity>
        </View>
        <Modal isVisible={isModalVisible}>
          <View>
            <TouchableOpacity onPress={toggleModal} className="items-center">
              <FontAwesome name="close" size={30} color={Styles.textColor} />
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              placeholder={t('AddCatalogs.catalogTitle')}
              value={userId}
              // onChangeText={text => setCatalogTitle(text)}
              className=" bg-white border p-5 text-xl my-2 rounded-xl"
            />
            <TextInput
              placeholder={t('AddCatalogs.catalogTitle')}
              value={userId}
              // onChangeText={text => setCatalogTitle(text)}
              className=" bg-white border p-5 text-xl my-2 rounded-xl"
            />
          </View>
          <View>
            <TouchableOpacity className="items-center" onPress={updateUser}>
              <FontAwesome name="check" size={30} color={Styles.textColor} />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default SettingsUserInfo;
