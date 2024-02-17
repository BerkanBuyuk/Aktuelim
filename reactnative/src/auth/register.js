import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
import {REGISTER_ENDPOINT} from '@env';
import RegisterLottie from '../components/Loader/registerLottie';
import {useNavigation} from '@react-navigation/native';
import Divider from '../components/Divider';
import Modal from 'react-native-modal';
import LoadingLoader from '../components/Loader/loadingLoader';
import {useToast} from 'react-native-toast-notifications';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  CLOUDINARY_POST_URL,
  CLOUDINARY_NO_PIC,
  CLOUDINARY_CLOUDNAME,
} from '@env';

const Register = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toast = useToast();
  const navigation = useNavigation();
  const [picPhoto, setPicPhoto] = useState(CLOUDINARY_NO_PIC);

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
          setPicPhoto(photoData.secure_url);
        })
        .catch(err => {
          console.log(`HATA : ${err}`);
        });
    };
  };

  const [formData, setFormData] = useState({
    user_username: '',
    user_email: '',
    user_password: '',
    user_name: '',
    user_pic: picPhoto,
    user_phone: '',
  });

  const handleChange = (key, value) => {
    setFormData({...formData, [key]: value});
  };

  console.log(formData);
  console.log(picPhoto);
  console.log('USER NUMBER: ', formData.user_phone);

  const handleClick = async () => {
    setModalVisible(true);
    try {
      const response = await axios.post(REGISTER_ENDPOINT, formData);
      console.log('Başarılı giriş:', response.data);
      setModalVisible(false);
      navigation.navigate('Login');
      toast.show('Kayıt başarılı.', {type: 'success'});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setFormData(prevState => ({
      ...prevState,
      user_pic: picPhoto,
    }));
  }, [picPhoto]);

  return (
    <View className="justify-center -mt-6">
      <View className="items-center mt-3">
        <RegisterLottie />
      </View>
      <View className="items-center -mt-24">
        <TouchableOpacity onPress={selectPhotoTapped}>
          <Image source={{uri: picPhoto}} className="w-24 h-24 rounded-full" />
        </TouchableOpacity>
      </View>
      <View className="mx-2.5 my-2">
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
          keyboardType="email-address"
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
        <View className="flex-row items-center">
          <Text className="text-xl mr-1">+90</Text>
          <TextInput
            placeholder="Telefon Numarası"
            name="user_phone"
            onChangeText={text => handleChange('user_phone', text)}
            className="border p-5 text-xl my-2 rounded-xl flex-1"
            keyboardType="number-pad"
          />
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={handleClick}
          className="items-center bg-baseColor rounded-2xl mx-2.5 my-3 p-4">
          <Text className="text-white text-2xl">Kayıt Ol</Text>
        </TouchableOpacity>
      </View>

      <View className="mx-2.5 -mt-3">
        <Divider />
      </View>

      <View className="flex-row justify-center">
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
