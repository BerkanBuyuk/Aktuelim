import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
import {LOGIN_ENDPOINT} from '@env';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import LoginLottie from '../components/Loader/loginLottie';
import Divider from '../components/Divider';
import Modal from 'react-native-modal';
import LoadingLoader from '../components/Loader/loadingLoader';

const Login = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toast = useToast();
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    user_username: '',
    user_password: '',
  });

  const [err, setErr] = useState(null);

  const handleChange = (key, value) => {
    setFormData({...formData, [key]: value});
  };

  const extractAccessTokenFromCookies = cookies => {
    const accessTokenCookie = cookies.find(cookie =>
      cookie.includes('accessToken'),
    );
    const accessToken = accessTokenCookie.split('=')[1];

    return accessToken;
  };

  const handleClick = async () => {
    setModalVisible(true);
    try {
      const response = await axios.post(LOGIN_ENDPOINT, formData);
      console.log('Başarılı giriş:', response.data);
      console.log('Kullanıcı Görseli: ', response.data.user_pic);
      console.log('Kullanıcı Rolü: ', response.data.user_role);

      const userPicture = response.data.user_pic;
      AsyncStorage.setItem('userPicture', userPicture);
      const userNameSurname = response.data.user_name;
      AsyncStorage.setItem('userNameSurname', userNameSurname);
      const userName = response.data.user_username;
      AsyncStorage.setItem('userName', userName);
      const userEmail = response.data.user_email;
      AsyncStorage.setItem('userEmail', userEmail);
      const userRole = response.data.user_role;
      AsyncStorage.setItem('userRole', userRole);

      const cookies = response.headers['set-cookie'];
      const accessToken = extractAccessTokenFromCookies(cookies);

      await AsyncStorage.setItem('accessToken', accessToken);
      console.log('AccessToken: ', accessToken);
      toast.show(`Hoşgeldin ${response.data.user_name}`, {type: 'success'});
      setModalVisible(false);

      navigation.navigate('DrawerNavigator');
    } catch (error) {
      setErr(error.response.data);
      setModalVisible(false);
    }
  };

  return (
    <View className="flex-1 justify-center">
      <View className="items-center">
        <LoginLottie />
        <Text className="text-5xl font-bold">Hoşgeldiniz</Text>
      </View>
      <View className="mx-2.5 my-2.5">
        <TextInput
          placeholder="Kullanıcı Adı"
          name="user_username"
          onChangeText={text => handleChange('user_username', text)}
          className="border p-5 text-xl my-2 rounded-xl"
        />
        <TextInput
          placeholder="Şifre"
          name="user_password"
          secureTextEntry
          onChangeText={text => handleChange('user_password', text)}
          className="border p-5 text-xl my-2 rounded-xl"
        />
      </View>
      <View className="items-end mx-2.5">
        <TouchableOpacity onPress={null}>
          <Text className="text-baseColor text-base">Şifremi Unuttum</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          onPress={handleClick}
          className="items-center bg-baseColor rounded-2xl mx-2.5 my-5 p-4">
          <Text className="text-white text-2xl">Giriş Yap</Text>
        </TouchableOpacity>
      </View>

      <View className="mx-2.5">
        <Divider />
      </View>

      <View className="items-center">
        <TouchableOpacity onPress={null}>
          <Image
            source={require('../assets/Images/google.png')}
            className="w-14 h-14"
          />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center mt-4">
        <Text className="text-base">Hesabınız yok mu ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text className="text-baseColor text-base"> Kaydol</Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={isModalVisible}>
        <View>
          <LoadingLoader />
        </View>
      </Modal>

      {err && <Text>{err}</Text>}
    </View>
  );
};

export default Login;
