import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import axios from 'axios';
import {FAVORITES_URL} from '@env';
import {useToast} from 'react-native-toast-notifications';

const FavoriteBtn = ({catalogId, catalogTitle, fetchFavorites}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const checkInitialFavoriteStatus = async url => {
      try {
        const response = await axios.get(url);
        const favorites = response.data;
        const isAlreadyFavorite = favorites.some(
          favorite => favorite.catalog_id === catalogId,
        );
        setIsFavorite(isAlreadyFavorite);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    checkInitialFavoriteStatus(FAVORITES_URL);
  }, [catalogId]);

  const handleFavoritePress = async () => {
    try {
      setIsFavorite(prevIsFavorite => !prevIsFavorite);

      if (!isFavorite) {
        await axios.post(FAVORITES_URL, {
          catalog_id: catalogId,
        });
        console.log(`Catalog id: ${catalogId} post edildi.`);
        toast.show(`${catalogTitle} favorilere eklendi.`, {type: 'success'});
        await fetchFavorites();
      } else if (Platform.OS === 'ios') {
        const response = await axios.get(FAVORITES_URL);
        const favorites = response.data;
        const favoriteToDelete = favorites.find(
          favorite => favorite.catalog_id === catalogId,
        );

        if (favoriteToDelete) {
          const favoriIdToDelete = favoriteToDelete.favori_id;

          await axios.delete(`${FAVORITES_URL}/${favoriIdToDelete}`);
          console.log(
            `Catalog id: ${catalogId} olan favori id: ${favoriIdToDelete} silindi.`,
          );
          toast.show(`${catalogTitle} favorilerden kaldırıldı.`, {
            type: 'danger',
          });
          await fetchFavorites();
        }
      } else if (Platform.OS === 'android') {
        const response = await axios.get(FAVORITES_URL);
        const favorites = response.data;
        const favoriteToDelete = favorites.find(
          favorite => favorite.catalog_id === catalogId,
        );

        if (favoriteToDelete) {
          const favoriIdToDelete = favoriteToDelete.favori_id;

          await axios.delete(`${FAVORITES_URL}/${favoriIdToDelete}`);
          console.log(
            `Catalog id: ${catalogId} olan favori id: ${favoriIdToDelete} silindi.`,
          );
          toast.show(`${catalogTitle} favorilerden kaldırıldı.`, {
            type: 'danger',
          });
          await fetchFavorites();
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
