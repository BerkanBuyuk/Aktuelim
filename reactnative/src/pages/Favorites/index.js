import React, {useEffect, useState} from 'react';
import {View, Image, FlatList, Platform} from 'react-native';
import axios from 'axios';

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
      fetchFavorites('http://10.0.2.2:8800/api');
      fetchCatalogs('http://10.0.2.2:8800/api');
    } else if (Platform.OS === 'ios') {
      fetchFavorites('http://localhost:8800/api');
      fetchCatalogs('http://localhost:8800/api');
    }
  }, []);

  // Favori katalogların resimlerini filtrele
  const favoriteCatalogImages = favorites.map(favorite => {
    const catalog = catalogs.find(c => c.catalog_id === favorite.catalog_id);
    return catalog ? catalog.catalog_image : null;
  });

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <FlatList
        data={favoriteCatalogImages}
        // numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View>
            {item && (
              <Image source={{uri: item}} style={{width: 150, height: 150}} />
            )}
          </View>
        )}
      />
    </View>
  );
};

export default Favorites;
