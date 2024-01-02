import React, {useEffect, useState} from 'react';
import {View, Text, Image, Platform, FlatList} from 'react-native';
import axios from 'axios';

const Catalogs = ({route}) => {
  const [catalogs, setCatalogs] = useState([]);

  const getCatalogs = async url => {
    try {
      const response = await axios.get(`${url}/catalogs`);
      const result = response.data.filter(
        val => val.market_id === route.params.market_id,
      );
      setCatalogs(result);
    } catch (error) {
      console.log('Hata: ', error);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      getCatalogs('http://10.0.2.2:8800/api');
    } else if (Platform.OS === 'ios') {
      getCatalogs('http://localhost:8800/api');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const catalogContainer = ({item}) => {
    console.log(item);
    return (
      <View key={item.catalog_id} style={{flex: 1}}>
        <Text>{item.catalog_title}</Text>
        {/* <Image
          source={{uri: `${item.catalog_image}`}}
          style={{width: 420, height: 650}}
        /> */}
      </View>
    );
  };

  return (
    <FlatList
      numColumns={2}
      data={catalogs}
      renderItem={item => catalogContainer(item)}
    />
  );
};

export default Catalogs;
