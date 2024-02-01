import {TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {useSelector} from 'react-redux';
import Styles from '../../assets/Styles';
import {useToast} from 'react-native-toast-notifications';
import axios from 'axios';

const UpdateCatalogBtn = ({catalogs, onUpdate}) => {
  const darkMode = useSelector(state => state.theme.darkMode);
  const toast = useToast();

  return (
    <TouchableOpacity>
      <FontAwesome
        name="edit"
        size={25}
        color={darkMode ? Styles.textColor : Styles.dark_text_color}
      />
    </TouchableOpacity>
  );
};

export default UpdateCatalogBtn;
