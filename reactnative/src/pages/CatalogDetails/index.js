import {View, Image} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const CatalogDetails = ({route}) => {
  const darkMode = useSelector(state => state.theme.darkMode);
  return (
    <View
      className={`flex-1 p-2.5 justify-center content-center ${
        darkMode ? 'bg-dark_bg_color' : 'bg-light_bg_color'
      }`}>
      <Image
        source={{uri: `${route.params.catalog_image}`}}
        className="w-full h-[calc(100vh/1.5)]"
      />
    </View>
  );
};

export default CatalogDetails;
