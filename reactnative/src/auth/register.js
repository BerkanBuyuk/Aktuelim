import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {REGISTER_ENDPOINT} from '@env';
import RegisterLottie from '../components/Loader/registerLottie';
import {useNavigation} from '@react-navigation/native';
import Divider from '../components/Divider';
import Modal from 'react-native-modal';
import LoadingLoader from '../components/Loader/loadingLoader';
import {useToast} from 'react-native-toast-notifications';

const Register = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toast = useToast();
  const navigation = useNavigation();
  const [err, setErr] = useState(null);
  const [formData, setFormData] = useState({
    user_username: '',
    user_email: '',
    user_password: '',
    user_name: '',
  });

  const handleChange = (key, value) => {
    setFormData({...formData, [key]: value});
  };

  console.log(formData);

  const handleClick = async () => {
    setModalVisible(true);
    try {
      const response = await axios.post(REGISTER_ENDPOINT, formData);
      console.log('Başarılı giriş:', response.data);
      setModalVisible(false);
      navigation.navigate('DrawerNavigator');
      toast.show(`Hoşgeldiniz user_name`, {type: 'success'});
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <View className="flex-1 justify-center">
      <View className="items-center">
        <RegisterLottie />
        <Text className="text-5xl font-bold">Kayıt Ol</Text>
      </View>
      {err && <Text>{err}</Text>}
      <View className="mx-2.5 my-2.5">
        <TextInput
          placeholder="Kullanıcı Adı"
          name="user_username"
          onChangeText={text => handleChange('user_username', text)}
          className="border p-5 text-xl my-2 rounded-xl"
        />
        <TextInput
          placeholder="E-Posta"
          name="user_email"
          onChangeText={text => handleChange('user_email', text)}
          className="border p-5 text-xl my-2 rounded-xl"
        />
        <TextInput
          placeholder="Şifre"
          name="user_password"
          secureTextEntry
          onChangeText={text => handleChange('user_password', text)}
          className="border p-5 text-xl my-2 rounded-xl"
        />
        <TextInput
          placeholder="İsim"
          name="user_name"
          onChangeText={text => handleChange('user_name', text)}
          className="border p-5 text-xl my-2 rounded-xl"
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={handleClick}
          className="items-center bg-baseColor rounded-2xl mx-2.5 my-5 p-4">
          <Text className="text-white text-2xl">Kayıt Ol</Text>
        </TouchableOpacity>
      </View>

      <View className="mx-2.5">
        <Divider />
      </View>

      <View className="flex-row justify-center mt-4">
        <Text className="text-base">Hesabınız var mı ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-baseColor text-base"> Giriş Yap</Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={isModalVisible}>
        <View>
          <LoadingLoader />
        </View>
      </Modal>
    </View>
  );
};

export default Register;
