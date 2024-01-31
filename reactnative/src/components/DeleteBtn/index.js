import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

const DeleteBtn = ({onDelete, itemId}) => {
  const {t} = useTranslation();
  const handleDelete = () => {
    onDelete(itemId);
  };

  return (
    <TouchableOpacity onPress={handleDelete}>
      <Text className="text-base p-2.5 text-red-600">
        {t('ShopList.shopList_deleteBtn')}
      </Text>
    </TouchableOpacity>
  );
};

export default DeleteBtn;
