import {View, Button, Alert} from 'react-native';
import React, {useState} from 'react';
import {addData} from '../../pages/ShopList/SQLiteDB'; // SQLiteDB.js dosyanızın doğru yolunu belirttiğinizden emin olun

const AddAlert = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <View>
      <Button
        title="+"
        onPress={() => {
          console.log('+ basıldı');
        }}
      />
    </View>
  );
};

export default AddAlert;
