import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Platform,
} from 'react-native';
import axios from 'axios';
import {ANDROID_BASE_URL, IOS_BASE_URL} from '@env';
import {useTranslation} from 'react-i18next';

const Categories = ({setSelectedCategory}) => {
  const [data, setData] = useState([]);
  const {t} = useTranslation();

  const getCategories = async url => {
    try {
      const response = await axios.get(`${url}/categories`);
      setData(response.data);
    } catch (error) {
      console.log('Hata: ', error);
    }
  };

  useEffect(() => {
    const url = Platform.OS === 'android' ? ANDROID_BASE_URL : IOS_BASE_URL;
    getCategories(url);
  }, []);

  const categoriesContainer = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedCategory(item.category_id);
        }}
        style={styles.touchableOpacityStyle}>
        <Image
          source={{uri: `${item.category_image}`}}
          style={styles.categoriesImage}
        />
        <Text style={styles.categoriesTitle}>{t(item.category_name)}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={item => categoriesContainer(item)}
        style={styles.flatListStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  categoriesImage: {
    width: 100,
    height: 100,
    borderRadius: 500,
  },
  categoriesTitle: {},
  flatListStyle: {
    margin: 5,
    padding: 5,
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
  },
  touchableOpacityStyle: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
});
