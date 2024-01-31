import React, {useEffect, useState} from 'react';
import {View, Image, FlatList, Text} from 'react-native';
import axios from 'axios';
import Divider from '../../components/Divider';
import {BASE_URL, CATALOGS_URL} from '@env';
import Loader from '../../components/Loader';

const Favorites = ({favorites, fetchFavorites}) => {
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCatalogs = async url => {
    try {
      const response = await axios.get(url);
      setCatalogs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Hata: ', error);
    }
  };

  useEffect(() => {
    fetchFavorites(BASE_URL);
    fetchCatalogs(CATALOGS_URL);
  }, [fetchFavorites]);

  const favoriteCatalogImages = favorites.map(favorite => {
    const catalog = catalogs.find(c => c.catalog_id === favorite.catalog_id);
    return catalog ? catalog.catalog_image : null;
  });

  const favoriteCatalogTitles = favorites.map(favorite => {
    const catalog = catalogs.find(c => c.catalog_id === favorite.catalog_id);
    return catalog ? catalog.catalog_title : null;
  });

  return (
    <View className="flex-1 items-center justify-center">
      {loading ? (
        <Loader />
      ) : (
        <View className="bg-dark_bg_color">
          <FlatList
            data={favoriteCatalogImages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View>
                <View className="bg-gray-300 rounded-2xl">
                  <Text className="text-center mb-2.5 text-xl">
                    {favoriteCatalogTitles[index]}
                  </Text>
                  {item && (
                    <Image
                      source={{uri: favoriteCatalogImages[index]}}
                      className="w-[calc(100vw/1.02)] h-[calc(100vh/1.4)] mx-1 rounded-bl-lg rounded-br-lg"
                    />
                  )}
                </View>
                <Divider />
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Favorites;
