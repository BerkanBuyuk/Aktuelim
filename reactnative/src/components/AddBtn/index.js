import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const AddAlert = ({onPress}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity onPress={onPress}>
        <Text style={{fontSize: 20, color: '#52BBFF'}}>Ekle</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddAlert;
