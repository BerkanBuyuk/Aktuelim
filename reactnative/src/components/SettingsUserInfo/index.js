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
import {
  USERS_URL,
  CLOUDINARY_POST_URL,
  CLOUDINARY_PIC_URL,
  CLOUDINARY_CLOUDNAME,
} from '@env';
import LoadingLoader from '../Loader/loadingLoader';
import {launchImageLibrary} from 'react-native-image-picker';

const SettingsUserInfo = ({navigation}) => {
  const darkMode = useSelector(state => state.theme.darkMode);
  const {t} = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const toast = useToast();
  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState(null);
  const [userNameText, setUserNameText] = useState('');
  const [userName, setUserName] = useState('');
  const [userPic, setUserPic] = useState(null);
  const [userMail, setUserMail] = useState('');

  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const user_id = await AsyncStorage.getItem('userId');
        setUserId(user_id);
        const response = await axios.get(`${USERS_URL}/${userId}`);
        setUserNameText(response.data.user_username);
        setUserName(response.data.user_name);
        setUserPic(response.data.user_pic);
        setUserMail(response.data.user_email);
        setLoading(false);
      } catch (error) {
        console.log('Hata: ', error);
      }
    };

    getUserDetail();
  }, [userId]);

  const selectPhotoTapped = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        const type = response.assets[0].type;
        const name = response.assets[0].fileName;
        const source = {
          uri,
          type,
          name,
        };
        cloudinaryUpload(source);
      }
    });

    const cloudinaryUpload = photoSource => {
      const data = new FormData();
      data.append('file', photoSource);
      data.append('upload_preset', CLOUDINARY_CLOUDNAME);
      data.append('cloud_name', CLOUDINARY_CLOUDNAME);
      fetch(CLOUDINARY_POST_URL, {
        method: 'POST',
        body: data,
      })
        .then(res => res.json())
        .then(photoData => {
          setUserPic(photoData.secure_url);
        })
        .catch(err => {
          console.log(`HATA : ${err}`);
        });
    };
  };

  const updateUser = async () => {
    try {
      const data = {
        user_id: userId,
        user_username: userNameText,
        user_name: userName,
        user_pic: userPic,
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
      {loading ? (
        <LoadingLoader />
      ) : (
        <View>
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
                <Image
                  source={{uri: userPic}}
                  className="w-32 h-32 rounded-full"
                />
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
                  {userName}
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
                  {userNameText}
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
                  {userMail}
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
                  ************
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
            </View>
            <Modal isVisible={isModalVisible}>
              <View>
                <TouchableOpacity
                  onPress={toggleModal}
                  className="items-center">
                  <FontAwesome
                    name="close"
                    size={30}
                    color={Styles.textColor}
                  />
                </TouchableOpacity>
              </View>
              <View className="mt-2.5">
                <TouchableOpacity
                  onPress={selectPhotoTapped}
                  className="items-center">
                  <Image
                    source={{uri: userPic}}
                    className="w-32 h-32 rounded-full"
                  />
                </TouchableOpacity>
                <TextInput
                  // placeholder={t('AddCatalogs.catalogTitle')}
                  placeholder="İsim Soyisim"
                  value={userName}
                  onChangeText={text => setUserName(text)}
                  className=" bg-white border p-5 text-xl my-2 rounded-xl"
                />
                <TextInput
                  // placeholder={t('AddCatalogs.catalogTitle')}
                  placeholder="Kullanıcı Adı"
                  value={userNameText}
                  onChangeText={text => setUserNameText(text)}
                  className=" bg-white border p-5 text-xl my-2 rounded-xl"
                />
              </View>
              <View>
                <TouchableOpacity className="items-center" onPress={updateUser}>
                  <FontAwesome
                    name="check"
                    size={30}
                    color={Styles.textColor}
                  />
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SettingsUserInfo;
