import {StyleSheet, View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {useSelector} from 'react-redux';
import Styles from '../../assets/Styles';

const AddCatalogs = () => {
  const darkMode = useSelector(state => state.theme.darkMode);
  return (
    <View
      style={[
        styles.view_style,
        {
          backgroundColor: darkMode
            ? Styles.dark_bg_color
            : Styles.light_bg_color,
        },
      ]}>
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

const styles = StyleSheet.create({
  view_style: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
