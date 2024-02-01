import {TouchableOpacity} from 'react-native';
import React from 'react';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {useSelector} from 'react-redux';
import Styles from '../../assets/Styles';
import {CATALOGS_URL} from '@env';
import {useToast} from 'react-native-toast-notifications';

const DeleteCatalogBtn = ({catalogs, onDelete}) => {
  const darkMode = useSelector(state => state.theme.darkMode);
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await axios.delete(`${CATALOGS_URL}/${catalogs.catalog_id}`);
      onDelete();
      toast.show(`${catalogs.catalog_title} silindi.`, {
        type: 'success',
      });
    } catch (error) {
      console.error('Silme hatası:', error);
      toast.show(`${catalogs.catalog_title} silerken hata oluştu.`, {
        type: 'danger',
      });
    }
  };

  return (
    <TouchableOpacity onPress={handleDelete}>
      <FontAwesome
        name="trash-o"
        size={25}
        color={darkMode ? Styles.textColor : Styles.dark_text_color}
      />
    </TouchableOpacity>
  );
};

export default DeleteCatalogBtn;
