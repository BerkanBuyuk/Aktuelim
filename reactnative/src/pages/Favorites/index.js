import React, {useEffect, useState} from 'react';
import {View, Image, FlatList, Platform, StyleSheet, Text} from 'react-native';
import axios from 'axios';
import Divider from '../../components/Divider';
import {ANDROID_BASE_URL, IOS_BASE_URL} from '@env';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [catalogs, setCatalogs] = useState([]);

  const fetchFavorites = async url => {
    try {
      const response = await axios.get(`${url}/favorites`);
      setFavorites(response.data);
    } catch (error) {
      console.error('Hata: ', error);
    }
  };

  const fetchCatalogs = async url => {
    try {
      const response = await axios.get(`${url}/catalogs`);
      setCatalogs(response.data);
    } catch (error) {
      console.error('Hata: ', error);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      fetchFavorites(ANDROID_BASE_URL);
      fetchCatalogs(ANDROID_BASE_URL);
    } else if (Platform.OS === 'ios') {
      fetchFavorites(IOS_BASE_URL);
      fetchCatalogs(IOS_BASE_URL);
    }
  }, []);

  // Favori katalogların resimlerini filtrele
  const favoriteCatalogImages = favorites.map(favorite => {
    const catalog = catalogs.find(c => c.catalog_id === favorite.catalog_id);
    return catalog ? catalog.catalog_image : null;
  });

  const favoriteCatalogTitles = favorites.map(favorite => {
    const catalog = catalogs.find(c => c.catalog_id === favorite.catalog_id);
    return catalog ? catalog.catalog_title : null;
  });

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <FlatList
        data={favoriteCatalogImages}
        // numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={{flex: 1}}>
            <Text style={styles.text_style}>
              {favoriteCatalogTitles[index]}
            </Text>
            {item && (
              <Image
                source={{uri: favoriteCatalogImages[index]}}
                style={styles.image_style}
              />
            )}
            <Divider />
          </View>
        )}
      />
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  image_style: {
    width: 420,
    height: 650,
  },
  text_style: {
    textAlign: 'center',
    marginBottom: 10,
    // backgroundColor: 'red',
    fontSize: 20,
  },
});
