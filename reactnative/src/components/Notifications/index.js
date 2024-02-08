import {View, Text, FlatList, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Styles from '../../assets/Styles';
import Divider from '../Divider';
import {useSelector} from 'react-redux';
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import {MARKETS_URL} from '@env';
import LoadingLoader from '../Loader/loadingLoader';

const Downloads = () => {
  return (
    <View>
      <Text>Downloads</Text>
    </View>
  );
};

export default Downloads;
