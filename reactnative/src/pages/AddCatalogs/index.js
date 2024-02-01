import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {CATALOGS_URL} from '@env';
import {useTranslation} from 'react-i18next';
import {Dropdown} from 'react-native-element-dropdown';
import {useToast} from 'react-native-toast-notifications';

const AddCatalogs = () => {
  const darkMode = useSelector(state => state.theme.darkMode);
  const [catalogTitle, setCatalogTitle] = useState('');
  const [catalogImage, setCatalogImage] = useState('');
  const [catalogDescription, setCatalogDescription] = useState('');
  const [marketId, setMarketId] = useState(null);
  const {t} = useTranslation();
  const toast = useToast();

  const marketsData = [
    {label: 'Bim', marketId: '1'},
    {label: 'A101', marketId: '2'},
    {label: 'Şok', marketId: '3'},
    {label: 'Migros', marketId: '4'},
    {label: 'Vatan Computer', marketId: '5'},
    {label: 'Media Markt', marketId: '6'},
    {label: 'Watsons', marketId: '7'},
    {label: 'Farmasi', marketId: '8'},
    {label: 'Bauhaus', marketId: '9'},
    {label: 'Koçtaş', marketId: '10'},
  ];

  const handlePostRequest = async () => {
    try {
      const data = {
        catalog_title: catalogTitle,
        catalog_image: catalogImage,
        catalog_description: catalogDescription,
        market_id: parseInt(marketId, 10),
      };

      const response = await axios.post(CATALOGS_URL, data);
      console.log(response.data);
      toast.show('Yeni katalog eklendi.', {type: 'success'});
    } catch (error) {
      console.log(error);
      toast.show('Yeni katalog eklenirken hata oluştu.', {type: 'danger'});
    }
  };

  return (
    <View
      className={` flex-1 mx-2.5 ${
        darkMode ? 'bg-dark_bg_color' : 'bg-light_bg_color'
      }`}>
      <TextInput
        placeholder="catalog_title"
        value={catalogTitle}
        onChangeText={text => setCatalogTitle(text)}
        className={`border p-5 text-xl my-2 rounded-xl ${
          darkMode ? 'bg-dark_textInput_color' : 'bg-light_textInput_color'
        }`}
      />
      <TextInput
        placeholder="catalog_image"
        value={catalogImage}
        onChangeText={text => setCatalogImage(text)}
        className={`border p-5 text-xl my-2 rounded-xl ${
          darkMode ? 'bg-dark_textInput_color' : 'bg-light_textInput_color'
        }`}
      />
      <TextInput
        placeholder="catalog_description"
        value={catalogDescription}
        onChangeText={text => setCatalogDescription(text)}
        className={`border p-5 text-xl my-2 rounded-xl ${
          darkMode ? 'bg-dark_textInput_color' : 'bg-light_textInput_color'
        }`}
      />
      <Dropdown
        className="h-12 my-2 border-b-black border-b"
        data={marketsData}
        search
        maxHeight={300}
        labelField="label"
        valueField="marketId"
        placeholder="Market Seç"
        searchPlaceholder="Ara..."
        value={marketId}
        onChange={item => {
          setMarketId(item.marketId);
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
  );
};

export default AddCatalogs;
