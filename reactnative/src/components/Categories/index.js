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
import Styles from '../../assets/Styles';
import {useSelector} from 'react-redux';

const Categories = ({setSelectedCategory}) => {
  const [data, setData] = useState([]);
  const {t} = useTranslation();
  const darkMode = useSelector(state => state.theme.darkMode);

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
      <View
        style={[
          styles.view_style,
          {
            backgroundColor: darkMode
              ? Styles.dark_categories_color
              : Styles.categories_color,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            setSelectedCategory(item.category_id);
          }}
          style={styles.touchableOpacityStyle}>
          <View>
            <Image
              source={{uri: `${item.category_image}`}}
              style={styles.categoriesImage}
            />
          </View>
          <Text
            style={[
              styles.categoriesTitle,
              {color: darkMode ? Styles.textColor : Styles.dark_text_color},
            ]}>
            {t(item.category_name)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <Text
        style={[
          styles.textStyle,
          {color: darkMode ? Styles.textColor : Styles.dark_text_color},
        ]}>
        {t('categories')}
      </Text>
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
    margin: 5,
  },
  categoriesTitle: {
    fontSize: 15,
    marginBottom: 5,
  },
  flatListStyle: {
    margin: 5,
    padding: 5,
    // borderWidth: 0.5,
    // borderColor: '#e0e0e0',
  },
  touchableOpacityStyle: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  textStyle: {
    marginHorizontal: 10,
    fontSize: 20,
    fontStyle: 'italic',
  },
  view_style: {
    borderRadius: 20,
    marginHorizontal: 5,
  },
});
