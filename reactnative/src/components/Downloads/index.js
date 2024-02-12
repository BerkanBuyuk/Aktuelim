import {View, Text, FlatList, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Styles from '../../assets/Styles';
import Divider from '../Divider';
import {useSelector} from 'react-redux';
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import {MARKETS_URL} from '@env';
import LoadingLoader from '../Loader/loadingLoader';
import {BASE_URL, CATALOGS_URL} from '@env';

const Downloads = () => {
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCatalogs = async url => {
    try {
      const response = await axios.get(url);
      setCatalogs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Hata: ', error);
    }
  };

  useEffect(() => {
    // fetchFavorites(BASE_URL);
    fetchCatalogs(CATALOGS_URL);
  }, []);
  return (
    <View>
      <Text>Downloads</Text>
    </View>
  );
};

export default Downloads;
