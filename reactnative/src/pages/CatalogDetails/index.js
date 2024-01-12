import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Styles from '../../assets/Styles';

const CatalogDetails = ({route}) => {
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
