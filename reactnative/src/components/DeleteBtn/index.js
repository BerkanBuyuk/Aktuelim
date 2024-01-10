import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

const DeleteBtn = ({onDelete, itemId}) => {
  const {t} = useTranslation();
  const handleDelete = () => {
    onDelete(itemId);
  };

  return (
    <TouchableOpacity onPress={handleDelete}>
      <Text style={styles.deleteBtn}>{t('shopList_deleteBtn')}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deleteBtn: {
    color: 'red',
    fontSize: 16,
    padding: 10,
  },
});

export default DeleteBtn;
