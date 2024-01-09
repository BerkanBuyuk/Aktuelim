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
import {ANDROID_BASE_URL, IOS_BASE_URL} from '@env';

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
      getCatalogs(ANDROID_BASE_URL);
    } else if (Platform.OS === 'ios') {
      getCatalogs(IOS_BASE_URL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const catalogContainer = ({item}) => {
    const kisaltmaSiniri = 20;
    const kisaltilmisBaslik =
      item.catalog_title.length > kisaltmaSiniri
        ? item.catalog_title.slice(0, kisaltmaSiniri) + '...'
        : item.catalog_title;

    return (
      <View key={item.catalog_id} style={styles.flatListRenderItemStyle}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CatalogDetails', item)}>
          <Image
            source={{uri: `${item.catalog_image}`}}
            style={{width: 150, height: 150}}
          />
          <Text>{kisaltilmisBaslik}</Text>
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
        keyExtractor={item => item.catalog_id.toString()}
      />
    </View>
  );
};

export default Catalogs;

const styles = StyleSheet.create({
  flatListRenderItemStyle: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },
});
