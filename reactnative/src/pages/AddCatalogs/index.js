import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {CATALOGS_URL, MARKETS_URL} from '@env';
import {useTranslation} from 'react-i18next';
import {Dropdown} from 'react-native-element-dropdown';
import {useToast} from 'react-native-toast-notifications';
import LoadingLoader from '../../components/Loader/loadingLoader';

const AddCatalogs = () => {
  const darkMode = useSelector(state => state.theme.darkMode);
  const [catalogTitle, setCatalogTitle] = useState('');
  const [catalogImage, setCatalogImage] = useState('');
  const [catalogDescription, setCatalogDescription] = useState('');
  const [marketId, setMarketId] = useState(null);
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {t} = useTranslation();
  const toast = useToast();

  const handlePostRequest = async () => {
    try {
      const data = {
        catalog_title: catalogTitle,
        catalog_image: catalogImage,
        catalog_description: catalogDescription,
        market_id: marketId,
      };

      const response = await axios.post(CATALOGS_URL, data);
      console.log(response.data);
      toast.show('Yeni katalog eklendi.', {type: 'success'});
    } catch (error) {
      console.log(error);
      toast.show('Yeni katalog eklenirken hata oluştu.', {type: 'danger'});
    }
  };

  const fetchMarketsData = async url => {
    try {
      const response = await axios.get(url);
      setMarketData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMarketsData(MARKETS_URL);
  }, []);

  return (
    <View
      className={` flex-1 ${
        darkMode ? 'bg-dark_bg_color' : 'bg-light_bg_color'
      }`}>
      {loading ? (
        <LoadingLoader />
      ) : (
        <View className="mx-2.5 my-2.5">
          <TextInput
            placeholder={t('AddCatalogs.catalogTitle')}
            value={catalogTitle}
            onChangeText={text => setCatalogTitle(text)}
            className={`border p-5 text-xl my-2 rounded-xl ${
              darkMode ? 'bg-dark_textInput_color' : 'bg-light_textInput_color'
            }`}
          />
          <TextInput
            placeholder={t('AddCatalogs.catalogImage')}
            value={catalogImage}
            onChangeText={text => setCatalogImage(text)}
            className={`border p-5 text-xl my-2 rounded-xl ${
              darkMode ? 'bg-dark_textInput_color' : 'bg-light_textInput_color'
            }`}
          />
          <TextInput
            placeholder={t('AddCatalogs.catalogDescription')}
            value={catalogDescription}
            onChangeText={text => setCatalogDescription(text)}
            className={`border p-5 text-xl my-2 rounded-xl ${
              darkMode ? 'bg-dark_textInput_color' : 'bg-light_textInput_color'
            }`}
          />
          <Dropdown
            className="h-12 my-2 border-b-black border-b"
            data={marketData}
            search
            maxHeight={300}
            labelField="market_name"
            valueField="market_id"
            placeholder={t('AddCatalogs.selectMarket')}
            searchPlaceholder={t('AddCatalogs.searchMarket')}
            value={marketId}
            onChange={item => {
              setMarketId(item.market_id);
            }}
          />
          <TouchableOpacity
            onPress={handlePostRequest}
            className="items-center m-2.5">
            <Text className="text-xl text-addBtn">
              {t('ShopList.shopList_addBtn')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AddCatalogs;
