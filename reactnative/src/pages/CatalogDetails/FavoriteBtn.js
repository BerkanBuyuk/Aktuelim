import {View} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

const FavoriteBtn = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavoritePress = () => {
    setIsFavorite(prevIsFavorite => !prevIsFavorite);
  };
  return (
    <View>
      <MaterialIcons
        name={isFavorite ? 'favorite' : 'favorite-border'}
        size={35}
        color="red"
        onPress={() => {
          handleFavoritePress();
        }}
      />
    </View>
  );
};

export default FavoriteBtn;
