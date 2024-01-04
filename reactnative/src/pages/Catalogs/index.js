import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const Catalogs = ({route, navigation}) => {
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
    // console.log(item);
    return (
      <View key={item.catalog_id} style={styles.flatListRenderItemStyle}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CatalogDetails', item)}>
          <Image
            source={{uri: `${item.catalog_image}`}}
            style={{width: 150, height: 150}}
          />
          <Text>{item.catalog_title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <FlatList
        numColumns={2}
        data={catalogs}
        renderItem={item => catalogContainer(item)}
      />
    </View>
  );
};

export default Catalogs;

const styles = StyleSheet.create({
  flatListRenderItemStyle: {
    // backgroundColor: 'red',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },
});
