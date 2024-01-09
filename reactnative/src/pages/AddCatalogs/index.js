import {StyleSheet, View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';

const AddCatalogs = () => {
  return (
    <View style={styles.view_style}>
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
