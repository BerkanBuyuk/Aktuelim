import {View, Text, Button, Alert} from 'react-native';
import React from 'react';
import {deleteData} from '../../pages/ShopList/SQLiteDB';

const DeleteBtn = () => {
  return (
    <View>
      <Button
        title="-"
        onPress={() => {
          console.log('- Basıldı');
        }}
      />
    </View>
  );
};

export default DeleteBtn;
