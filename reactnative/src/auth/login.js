import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import axios from 'axios';
import {LOGIN_ENDPOINT} from '@env';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    user_username: '',
    user_password: '',
  });

  const [err, setErr] = useState(null);

  const handleChange = (key, value) => {
    setFormData({...formData, [key]: value});
  };

  const handleClick = async () => {
    try {
      const response = await axios.post(LOGIN_ENDPOINT, formData);
      console.log('Başarılı giriş:', response.data);
      navigation.navigate('LoginDrawerNavigator');
    } catch (error) {
      setErr(error.response.data);
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Login</Text>
      <TextInput
        placeholder="Username"
        name="user_username"
        onChangeText={text => handleChange('user_username', text)}
      />
      <TextInput
        placeholder="Password"
        name="user_password"
        secureTextEntry
        onChangeText={text => handleChange('user_password', text)}
      />
      <Button title="Login" onPress={handleClick} />
      {err && <Text>{err}</Text>}
    </View>
  );
};

export default Login;
