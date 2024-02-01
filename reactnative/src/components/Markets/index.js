import {Text, FlatList, TouchableOpacity, Image, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Categories from '../Categories';
import {MARKETS_URL} from '@env';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import Loader from '../Loader';

const Markets = ({navigation}) => {
  const {t} = useTranslation();
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [filteredMarkets, setFilteredMarkets] = useState(data);
  const darkMode = useSelector(state => state.theme.darkMode);
  const [loading, setLoading] = useState(true);

  const handleListFilteredData = () => {
    if (selectedCategory === 0) {
      setFilteredMarkets(data);
    } else {
      const values = data.filter(x => x.category_id === selectedCategory);
      setFilteredMarkets(values);
    }
  };

  const getMarkets = async url => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log('Hata: ', error);
    }
  };

  useEffect(() => {
    getMarkets(MARKETS_URL);
    if (selectedCategory !== 0) {
      handleListFilteredData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const marketsContainer = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Catalogs', item);
        }}
        className="mx-5 mb-5">
        <Image
          source={{uri: `${item.market_image}`}}
          className="h-24 w-36 rounded-lg"
        />
        <Text
          className={`text-center mt-1.5 text-base ${
            darkMode ? 'text-textColor' : 'text-dark_text_color'
          }`}>
          {item.market_name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      className={`flex-1 ${
        darkMode ? 'bg-dark_bg_color' : 'bg-light_bg_color'
      }`}>
      {loading ? (
        <Loader />
      ) : (
        <View>
          <Categories setSelectedCategory={setSelectedCategory} />
          <Text
            className={`ml-2.5 text-xl italic ${
              darkMode ? 'text-textColor' : 'text-dark_text_color'
            }`}>
            {t('stores')}
          </Text>
          <View className="items-center justify-center mt-3">
            <FlatList
              numColumns={2}
              data={selectedCategory === 0 ? data : filteredMarkets}
              renderItem={item => marketsContainer(item)}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Markets;
