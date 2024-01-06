import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

const CatalogDetails = ({route}) => {
  // console.log(route);
  return (
    <View style={styles.view_style}>
      <Image
        source={{uri: `${route.params.catalog_image}`}}
        style={styles.image_style}
      />
    </View>
  );
};

export default CatalogDetails;

const styles = StyleSheet.create({
  view_style: {
    flex: 1,
    alignContent: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  image_style: {
    width: '100%',
    height: '90%',
  },
});
