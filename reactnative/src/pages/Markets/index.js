import {
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Categories from '../../components/Categories';
import {ANDROID_BASE_URL, IOS_BASE_URL} from '@env';

const Markets = ({navigation}) => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [filteredMarkets, setFilteredMarkets] = useState(data);

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
        <Text style={styles.marketsTitle}>{item.market_name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Text style={styles.textStyle}>Kategoriler</Text>
      <Categories setSelectedCategory={setSelectedCategory} />
      <Text style={styles.textStyle}>Mağazalar</Text>
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
    borderRadius: 10,
  },
  marketsTitle: {
    width: 150,
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
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#e0e0e0',
    // backgroundColor: 'red',
  },
  textStyle: {
    marginHorizontal: 10,
    fontSize: 20,
    fontStyle: 'italic',
  },
});

export default Markets;
