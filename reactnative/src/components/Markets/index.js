import {
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Categories from '../Categories';
import {ANDROID_BASE_URL, IOS_BASE_URL} from '@env';
import {useTranslation} from 'react-i18next';
import i18next from '../../assets/locales/services/i18next';
import {useSelector} from 'react-redux';
import Styles from '../../assets/Styles';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const Markets = ({navigation}) => {
  const {t} = useTranslation();
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [filteredMarkets, setFilteredMarkets] = useState(data);
  const darkMode = useSelector(state => state.theme.darkMode);

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
      const response = await axios.get(`${url}/markets`);
      setData(response.data);
    } catch (error) {
      console.log('Hata: ', error);
    }
  };

  useEffect(() => {
    if (selectedCategory !== 0) {
      handleListFilteredData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      getMarkets(ANDROID_BASE_URL);
    } else if (Platform.OS === 'ios') {
      getMarkets(IOS_BASE_URL);
    }
  }, []);

  const marketsContainer = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Catalogs', item);
        }}
        style={styles.touchableOpacityStyle}>
        <Image
          source={{uri: `${item.market_image}`}}
          style={styles.marketsImage}
        />
        <Text
          style={[
            styles.marketsTitle,
            {color: darkMode ? Styles.textColor : Styles.dark_text_color},
          ]}>
          {item.market_name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.view_style,
        {
          backgroundColor: darkMode
            ? Styles.dark_bg_color
            : Styles.light_bg_color,
        },
      ]}>
      <Categories setSelectedCategory={setSelectedCategory} />
      <Text
        style={[
          styles.textStyle,
          {color: darkMode ? Styles.textColor : Styles.dark_text_color},
        ]}>
        {t('stores')}
      </Text>
      <FlatList
        numColumns={2}
        data={selectedCategory === 0 ? data : filteredMarkets}
        renderItem={item => marketsContainer(item)}
        style={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  marketsImage: {
    height: 100,
    width: 150,
    // Market fotoğraflarının hepsi localdbden çekilecek. htdocsta. boyutları tek tek photoshoptan ayarlanacak.
    borderRadius: 10,
    // height: deviceWidth / 3.9,
    // width: deviceWidth / 2.8,
  },
  marketsTitle: {
    // width: 150,
    textAlign: 'center',
    marginTop: 5,
    fontSize: 16,
  },
  flatListStyle: {
    // flex: 1,
    margin: 10,
    padding: 10,
    // backgroundColor: '#e0e0e0',
    // borderWidth: 1,
  },
  touchableOpacityStyle: {
    marginHorizontal: 20,
    marginBottom: 20,
    // borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#e0e0e0',
    // backgroundColor: 'red',
  },
  textStyle: {
    marginHorizontal: 10,
    fontSize: 20,
    fontStyle: 'italic',
  },
  view_style: {
    flex: 1,
  },
});

export default Markets;
