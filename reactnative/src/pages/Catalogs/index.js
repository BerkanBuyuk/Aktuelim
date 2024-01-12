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
import {useSelector} from 'react-redux';
import Styles from '../../assets/Styles';

const Catalogs = ({route, navigation}) => {
  const [catalogs, setCatalogs] = useState([]);
  const darkMode = useSelector(state => state.theme.darkMode);

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
      <View
        key={item.catalog_id}
        style={[
          styles.flatListRenderItemStyle,
          {borderColor: darkMode ? Styles.textColor : Styles.dark_text_color},
        ]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CatalogDetails', item)}>
          <Image
            source={{uri: `${item.catalog_image}`}}
            style={{width: 150, height: 150}}
          />
          <Text
            style={{
              color: darkMode ? Styles.textColor : Styles.dark_text_color,
            }}>
            {kisaltilmisBaslik}
          </Text>
        </TouchableOpacity>
      </View>
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
  view_style: {
    flex: 1,
    alignItems: 'center',
  },
});
