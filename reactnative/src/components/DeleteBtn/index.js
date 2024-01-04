import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const DeleteBtn = ({onDelete, itemId}) => {
  const handleDelete = () => {
    onDelete(itemId);
  };

  return (
    <TouchableOpacity onPress={handleDelete}>
      <Text style={styles.deleteBtn}>Sil</Text>
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
