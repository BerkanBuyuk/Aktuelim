import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Categories = () => {
  const [data, setData] = useState([]);

  const getCategories = async url => {
    try {
      const response = await axios.get(`${url}/categories`);
      setData(response.data);
    } catch (error) {
      console.log('Hata: ', error);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      getCategories('http://10.0.2.2:8800/api');
    } else if (Platform.OS === 'ios') {
      getCategories('http://localhost:8800/api');
    }
  }, []);

  const categoriesContainer = ({item}) => {
    // console.log(item);
    return (
      <TouchableOpacity
        onPress={() => {
          null;
        }}
        style={styles.touchableOpacityStyle}>
        <Image
          source={{uri: `${item.category_image}`}}
          style={styles.categoriesImage}
        />
        <Text style={styles.categoriesTitle}>{item.category_name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
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
  },
  categoriesTitle: {},
  flatListStyle: {
    // flex: 1,
    margin: 5,
    padding: 5,
    // backgroundColor: '#e0e0e0',
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
  },
  touchableOpacityStyle: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
});
