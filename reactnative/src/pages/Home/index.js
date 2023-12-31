import {
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getCatalogs = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api');
        setData(response.data);
      } catch (error) {
        console.log('Hata: ', error);
      }
    };
    getCatalogs();
  }, []);

  const myCatalogs = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // props.navigation.push('movieDetails', {movieId: item.id});
        }}
        style={{marginHorizontal: 20}}>
        <Image
          source={{uri: `${item.catalog_image_url}`}}
          style={styles.marketImage}
        />
        <Text style={styles.catalogTitle}>{item.catalog_title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      numColumns={2}
      data={data}
      renderItem={item => myCatalogs(item)}
      style={{flex: 1, margin: 10, padding: 10}}
    />
  );
};

const styles = StyleSheet.create({
  marketImage: {
    height: 100,
    width: 150,
    borderRadius: 10,
  },
  catalogTitle: {
    width: 150,
    textAlign: 'center',
    marginTop: 5,
    fontSize: 16,
  },
});

export default Home;
