import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const AddBtn = ({onPress}) => {
  return (
    <View style={styles.view_style}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.text_style}>Ekle</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddBtn;

const styles = StyleSheet.create({
  view_style: {
    alignItems: 'center',
    // backgroundColor: 'yellow',
    // marginHorizontal: 16,
    // margin: 10,
    flex: 0.2,
  },
  text_style: {
    fontSize: 20,
    color: '#52BBFF',
    // padding: 10,
    // backgroundColor: 'red',
  },
});
