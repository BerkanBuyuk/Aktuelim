import {View, StyleSheet} from 'react-native';
import React from 'react';

const Divider = () => {
  return <View style={styles.view_style} />;
};

export default Divider;

const styles = StyleSheet.create({
  view_style: {
    // flex: 1,
    height: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 15,
  },
});
