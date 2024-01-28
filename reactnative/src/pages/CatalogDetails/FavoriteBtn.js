import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import axios from 'axios';
import {ANDROID_FAVORITES_URL, IOS_FAVORITES_URL} from '@env';

const FavoriteBtn = ({catalogId}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkInitialFavoriteStatus = async () => {
      if (Platform.OS === 'android') {
        try {
          const response = await axios.get(ANDROID_FAVORITES_URL);
          const favorites = response.data;
          const isAlreadyFavorite = favorites.some(
            favorite => favorite.catalog_id === catalogId,
          );
          setIsFavorite(isAlreadyFavorite);
        } catch (error) {
          console.error('Error:', error);
        }
      } else if (Platform.OS === 'ios') {
        try {
          const response = await axios.get(IOS_FAVORITES_URL);
          const favorites = response.data;
          const isAlreadyFavorite = favorites.some(
            favorite => favorite.catalog_id === catalogId,
          );
          setIsFavorite(isAlreadyFavorite);
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    checkInitialFavoriteStatus();
  }, [catalogId]);

  const handleFavoritePress = async () => {
    try {
      setIsFavorite(prevIsFavorite => !prevIsFavorite);

      if (!isFavorite && Platform.OS === 'ios') {
        await axios.post(IOS_FAVORITES_URL, {
          catalog_id: catalogId,
        });
        console.log(`Catalog id: ${catalogId} post edildi.`);
      } else if (!isFavorite && Platform.OS === 'android') {
        await axios.post(ANDROID_FAVORITES_URL, {
          catalog_id: catalogId,
        });
      } else if (Platform.OS === 'ios') {
        const response = await axios.get(IOS_FAVORITES_URL);
        const favorites = response.data;
        const favoriteToDelete = favorites.find(
          favorite => favorite.catalog_id === catalogId,
        );

        if (favoriteToDelete) {
          const favoriIdToDelete = favoriteToDelete.favori_id;

          await axios.delete(`${IOS_FAVORITES_URL}/${favoriIdToDelete}`);
          console.log(
            `Catalog id: ${catalogId} olan favori id: ${favoriIdToDelete} silindi.`,
          );
        }
      } else if (Platform.OS === 'android') {
        const response = await axios.get(ANDROID_FAVORITES_URL);
        const favorites = response.data;
        const favoriteToDelete = favorites.find(
          favorite => favorite.catalog_id === catalogId,
        );

        if (favoriteToDelete) {
          const favoriIdToDelete = favoriteToDelete.favori_id;

          await axios.delete(`${IOS_FAVORITES_URL}/${favoriIdToDelete}`);
          console.log(
            `Catalog id: ${catalogId} olan favori id: ${favoriIdToDelete} silindi.`,
          );
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <MaterialIcons
      name={isFavorite ? 'favorite' : 'favorite-border'}
      size={35}
      color="red"
      onPress={() => {
        handleFavoritePress();
      }}
    />
  );
};

export default FavoriteBtn;
