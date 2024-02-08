import {Text, TextInput, TouchableOpacity, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {
  CATALOGS_URL,
  MARKETS_URL,
  CLOUDINARY_POST_URL,
  CLOUDINARY_ADDIMAGE_URL,
  CLOUDINARY_CLOUDNAME,
} from '@env';
import {useTranslation} from 'react-i18next';
import {Dropdown} from 'react-native-element-dropdown';
import {useToast} from 'react-native-toast-notifications';
import LoadingLoader from '../../components/Loader/loadingLoader';
import Modal from 'react-native-modal';
import {launchImageLibrary} from 'react-native-image-picker';

const AddCatalogs = ({navigation}) => {
  const [catalogTitle, setCatalogTitle] = useState('');
  const [catalogDescription, setCatalogDescription] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [marketId, setMarketId] = useState(null);
  const [marketData, setMarketData] = useState([]);
  const [photo, setPhoto] = useState(CLOUDINARY_ADDIMAGE_URL);
  const {t} = useTranslation();
  const toast = useToast();
  const darkMode = useSelector(state => state.theme.darkMode);

  const selectPhotoTapped = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        const type = response.assets[0].type;
        const name = response.assets[0].fileName;
        const source = {
          uri,
          type,
          name,
        };
        cloudinaryUpload(source);
      }
    });

    const cloudinaryUpload = photoSource => {
      const data = new FormData();
      data.append('file', photoSource);
      data.append('upload_preset', CLOUDINARY_CLOUDNAME);
      data.append('cloud_name', CLOUDINARY_CLOUDNAME);
      fetch(CLOUDINARY_POST_URL, {
        method: 'POST',
        body: data,
      })
        .then(res => res.json())
        .then(photoData => {
          setPhoto(photoData.secure_url);
        })
        .catch(err => {
          console.log(`HATA : ${err}`);
        });
    };
  };

  const handlePostRequest = async () => {
    setModalVisible(true);
    try {
      const data = {
        catalog_title: catalogTitle,
        catalog_image: photo,
        catalog_description: catalogDescription,
        market_id: marketId,
      };

      const request = await axios.post(CATALOGS_URL, data);
      toast.show('Yeni katalog eklendi.', {type: 'success'});
      if (request.status === 200) {
        setModalVisible(false);
      }
      navigation.goBack();
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
      className={`justify-center flex-1 ${
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
            onPress={selectPhotoTapped}
            className="items-center my-2.5">
            <Image
              source={{uri: photo}}
              className="w-full h-[calc(100vh/2.5)]"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePostRequest}
            className="items-center bg-baseColor rounded-2xl mx-2.5 my-5 p-4">
            <Text className="text-white text-2xl">
              {t('ShopList.shopList_addBtn')}
            </Text>
          </TouchableOpacity>

          <Modal isVisible={isModalVisible}>
            <View>
              <LoadingLoader />
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

export default AddCatalogs;
