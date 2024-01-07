import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import axios from 'axios';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [catalogs, setCatalogs] = useState([]);

  // Favori katalogları getir
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/favorites');
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  // Tüm katalogları getir
  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/catalogs');
        setCatalogs(response.data);
      } catch (error) {
        console.error('Error fetching catalogs:', error);
      }
    };

    fetchCatalogs();
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
