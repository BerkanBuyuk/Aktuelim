import {View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {useSelector} from 'react-redux';

const AddCatalogs = () => {
  const darkMode = useSelector(state => state.theme.darkMode);
  return (
    <View
      className={` flex-1 items-center justify-center ${
        darkMode ? 'bg-dark_bg_color' : 'bg-light_bg_color'
      }`}>
      <FontAwesome
        name="file-photo-o"
        size={200}
        color="#000"
        onPress={() => {
          null;
        }}
      />
    </View>
  );
};

export default AddCatalogs;
