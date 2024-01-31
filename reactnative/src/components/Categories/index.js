import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import axios from 'axios';
import {CATEGORIES_URL} from '@env';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const Categories = ({setSelectedCategory}) => {
  const [data, setData] = useState([]);
  const {t} = useTranslation();
  const darkMode = useSelector(state => state.theme.darkMode);

  const getCategories = async url => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log('Hata: ', error);
    }
  };

  useEffect(() => {
    getCategories(CATEGORIES_URL);
  }, []);

  const categoriesContainer = ({item}) => {
    return (
      <View
        className={`mx-1.5 rounded-3xl ${
          darkMode ? 'bg-dark_categories_color' : 'bg-categories_color'
        }`}>
        <TouchableOpacity
          onPress={() => {
            setSelectedCategory(item.category_id);
          }}
          className="items-center mx-1.5">
          <View>
            <Image
              source={{uri: `${item.category_image}`}}
              className="w-24 h-24 rounded-full m-1.5"
            />
          </View>
          <Text
            className={`text-base mb-1.5 ${
              darkMode ? 'text-textColor' : 'text-dark_text_color'
            }`}>
            {t(item.category_name)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <Text
        className={`mx-2.5 text-xl italic ${
          darkMode ? 'text-textColor' : 'text-dark_text_color'
        }`}>
        {t('categories')}
      </Text>
      <FlatList
        data={data}
        renderItem={item => categoriesContainer(item)}
        className="m-1.5 p-1.5"
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Categories;
