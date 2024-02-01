import {TouchableOpacity, View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {useSelector} from 'react-redux';
import Styles from '../../assets/Styles';
import {useToast} from 'react-native-toast-notifications';
import axios from 'axios';
import Modal from 'react-native-modal';
import {CATALOGS_URL, MARKETS_URL} from '@env';
import {Dropdown} from 'react-native-element-dropdown';
import {useTranslation} from 'react-i18next';

const UpdateCatalogBtn = ({catalogs, onUpdate}) => {
  const {t} = useTranslation();
  const darkMode = useSelector(state => state.theme.darkMode);
  const toast = useToast();
  const [isModalVisible, setModalVisible] = useState(false);
  const [catalogTitle, setCatalogTitle] = useState(catalogs.catalog_title);
  const [catalogImage, setCatalogImage] = useState(catalogs.catalog_image);
  const [catalogDescription, setCatalogDescription] = useState(
    catalogs.catalog_description,
  );
  const [marketId, setMarketId] = useState(catalogs.market_id);
  const [marketData, setMarketData] = useState([]);

  const handleUpdate = async () => {
    try {
      const data = {
        catalog_id: catalogs.catalog_id,
        catalog_title: catalogTitle,
        catalog_image: catalogImage,
        catalog_description: catalogDescription,
        market_id: marketId,
      };
      await axios.put(`${CATALOGS_URL}/${catalogs.catalog_id}`, data);
      onUpdate();
      toggleModal();
      toast.show(`${catalogs.catalog_title} güncellendi.`, {type: 'success'});
    } catch (error) {
      console.log(error);
      toast.show(`${catalogs.catalog_title} güncellenirken hata oluştu.`, {
        type: 'danger',
      });
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const fetchMarketsData = async url => {
    try {
      const response = await axios.get(url);
      setMarketData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMarketsData(MARKETS_URL);
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        <FontAwesome
          name="edit"
          size={25}
          color={darkMode ? Styles.textColor : Styles.dark_text_color}
        />
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View>
          <TouchableOpacity onPress={toggleModal} className="items-center">
            <FontAwesome name="close" size={30} color={Styles.textColor} />
          </TouchableOpacity>
          <TextInput
            placeholder={t('AddCatalogs.catalogTitle')}
            value={catalogTitle}
            onChangeText={text => setCatalogTitle(text)}
            className=" bg-white border p-5 text-xl my-2 rounded-xl"
          />
          <TextInput
            placeholder={t('AddCatalogs.catalogImage')}
            value={catalogImage}
            onChangeText={text => setCatalogImage(text)}
            className=" bg-white border p-5 text-xl my-2 rounded-xl"
          />
          <TextInput
            placeholder={t('AddCatalogs.catalogDescription')}
            value={catalogDescription}
            onChangeText={text => setCatalogDescription(text)}
            className=" bg-white border p-5 text-xl my-2 rounded-xl"
          />
          <Dropdown
            className="h-12 my-2 border-b-black border-b bg-white rounded-lg"
            selectedTextStyle={{marginHorizontal: 10, fontSize: 20}}
            inputSearchStyle={{borderRadius: 10}}
            data={marketData}
            search
            maxHeight={250}
            labelField="market_name"
            valueField="market_id"
            placeholder={t('AddCatalogs.selectMarket')}
            searchPlaceholder={t('AddCatalogs.searchMarket')}
            value={marketId}
            onChange={item => {
              setMarketId(item.market_id);
            }}
          />
          <TouchableOpacity className="items-center" onPress={handleUpdate}>
            <FontAwesome name="check" size={30} color={Styles.textColor} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default UpdateCatalogBtn;
