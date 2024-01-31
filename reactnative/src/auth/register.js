import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import axios from 'axios';
import {REGISTER_ENDPOINT} from '@env';

const Register = () => {
  const [formData, setFormData] = useState({
    user_username: '',
    user_email: '',
    user_password: '',
    user_name: '',
  });

  const [err, setErr] = useState(null);

  const handleChange = (key, value) => {
    setFormData({...formData, [key]: value});
  };

  // console.log(formData);

  const handleClick = async e => {
    e.preventDefault();

    try {
      await axios.post(REGISTER_ENDPOINT, formData);
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Register</Text>
      <TextInput
        placeholder="Username"
        name="user_username"
        onChangeText={text => handleChange('user_username', text)}
      />
      <TextInput
        placeholder="Email"
        name="user_email"
        onChangeText={text => handleChange('user_email', text)}
      />
      <TextInput
        placeholder="Password"
        name="user_password"
        secureTextEntry
        onChangeText={text => handleChange('user_password', text)}
      />
      <TextInput
        placeholder="Name"
        name="user_name"
        onChangeText={text => handleChange('user_name', text)}
      />
      <Button title="Register" onPress={handleClick} />
      {err && <Text>{err}</Text>}
    </View>
  );
};

export default Register;
