import {View, Text, Image} from 'react-native';
import React from 'react';

const CatalogDetails = ({route}) => {
  // console.log(route);
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: 'red',
        alignContent: 'center',
        // margin: 10,
        padding: 10,
      }}>
      <Image
        source={{uri: `${route.params.catalog_image}`}}
        style={{width: '100%', height: '90%'}}
      />
    </View>
  );
};

export default CatalogDetails;
