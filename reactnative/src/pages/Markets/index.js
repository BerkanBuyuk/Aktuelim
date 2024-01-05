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

const Markets = ({navigation}) => {
  const [data, setData] = useState([]);

  const getMarkets = async url => {
    try {
      const response = await axios.get(`${url}/markets`);
      setData(response.data);
    } catch (error) {
      console.log('Hata: ', error);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      getMarkets('http://10.0.2.2:8800/api');
    } else if (Platform.OS === 'ios') {
      getMarkets('http://localhost:8800/api');
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
    <View>
      <Categories />
      <FlatList
        numColumns={2}
        data={data}
        renderItem={item => marketsContainer(item)}
        style={styles.flatListStyle}
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
    backgroundColor: 'green',
  },
  touchableOpacityStyle: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

export default Markets;
