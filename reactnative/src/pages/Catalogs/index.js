import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {CATALOGS_URL} from '@env';
import {useSelector} from 'react-redux';
import LoadingLoader from '../../components/Loader/loadingLoader';
import DeleteCatalogBtn from '../../components/DeleteCatalogBtn';
import UpdateCatalogBtn from '../../components/UpdateCatalogBtn';

const Catalogs = ({route, navigation}) => {
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const darkMode = useSelector(state => state.theme.darkMode);

  const getCatalogs = async url => {
    try {
      const response = await axios.get(url);
      const result = response.data.filter(
        val => val.market_id === route.params.market_id,
      );
      setCatalogs(result);
      setLoading(false);
    } catch (error) {
      console.log('Hata: ', error);
    }
  };

  const handleCatalogDelete = () => {
    getCatalogs(CATALOGS_URL);
  };
  const handleUpdateCatalog = () => {
    getCatalogs(CATALOGS_URL);
  };

  useEffect(() => {
    getCatalogs(CATALOGS_URL);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const catalogContainer = ({item}) => {
    const abbreviationLimit = 20;
    const abbreviatedTitle =
      item.catalog_title.length > abbreviationLimit
        ? item.catalog_title.slice(0, abbreviationLimit) + '...'
        : item.catalog_title;

    return (
      <View className="mx-1.5">
        <View
          key={item.catalog_id}
          className={` p-2.5 border m-2.5 rounded-lg ${
            darkMode ? 'border-textColor' : 'border-dark_text_color'
          }`}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CatalogDetails', item)}>
            <Image
              source={{uri: `${item.catalog_image}`}}
              className="w-36 h-36"
            />
            <Text
              className={`${
                darkMode ? 'text-textColor' : 'text-dark_text_color'
              }`}>
              {abbreviatedTitle}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mx-3.5 flex-row justify-between mb-3">
          <DeleteCatalogBtn catalogs={item} onDelete={handleCatalogDelete} />
          <UpdateCatalogBtn catalogs={item} onUpdate={handleUpdateCatalog} />
        </View>
      </View>
    );
  };

  return (
    <View
      className={` flex-1 items-center ${
        darkMode ? 'bg-dark_bg_color' : 'bg-light_bg_color'
      }`}>
      {loading ? (
        <LoadingLoader />
      ) : (
        <FlatList
          numColumns={2}
          data={catalogs}
          renderItem={item => catalogContainer(item)}
          keyExtractor={item => item.catalog_id.toString()}
        />
      )}
    </View>
  );
};

export default Catalogs;
