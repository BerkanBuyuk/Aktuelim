import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Platform,
} from 'react-native';
import axios from 'axios';
import {ANDROID_LOGIN_ENDPOINT, IOS_LOGIN_ENDPOINT} from '@env';

const Login = () => {
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
      if (Platform.OS === 'android') {
        const response = await axios.post(ANDROID_LOGIN_ENDPOINT, formData);
        console.log('Başarılı giriş:', response.data);
      } else if (Platform.OS === 'ios') {
        const response = await axios.post(IOS_LOGIN_ENDPOINT, formData);
        console.log('Başarılı giriş:', response.data);
      }
    } catch (error) {
      setErr(error.response.data);
    }
  };

  return (
    <View style={styles.view_style}>
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

const styles = StyleSheet.create({
  view_style: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
