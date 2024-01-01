import {
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Markets = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const getMarkets = async () => {
        try {
          const response = await axios.get('http://10.0.2.2:8800/api');
          setData(response.data);
        } catch (error) {
          console.log('Hata: ', error);
        }
      };
      getMarkets();
    } else if (Platform.OS === 'ios') {
      const getMarkets = async () => {
        try {
          const response = await axios.get('http://localhost:8800/api');
          setData(response.data);
        } catch (error) {
          console.log('Hata: ', error);
        }
      };
      getMarkets();
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
          source={{uri: `${item.market.market_image}`}}
          style={styles.marketsImage}
        />
        <Text style={styles.marketsTitle}>{item.catalog_title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      numColumns={2}
      data={data}
      renderItem={item => marketsContainer(item)}
      style={styles.flatListStyle}
    />
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
    flex: 1,
    margin: 10,
    padding: 10,
  },
  touchableOpacityStyle: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

export default Markets;
