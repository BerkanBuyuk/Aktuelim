import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Dialog from 'react-native-dialog';

const UpdateBtn = ({onUpdate, itemText}) => {
  const [visible, setVisible] = useState(false);
  const [newText, setNewText] = useState(itemText);

  const showDialog = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const handleUpdate = () => {
    if (!newText) {
      Alert.alert('Boş liste girilemez !', '', [
        {
          text: 'Tamam',
          style: 'cancel',
        },
      ]);

      return false;
    }
    onUpdate(newText);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDialog}>
        <Text style={styles.updateBtn}>Güncelle</Text>
      </TouchableOpacity>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Güncelleyiniz.</Dialog.Title>
        <TextInput
          value={newText}
          onChangeText={text => setNewText(text)}
          defaultValue={itemText}
          style={styles.input_style}
        />
        <Dialog.Button label="İptal" onPress={handleCancel} color="red" />
        <Dialog.Button label="Güncelle" onPress={handleUpdate} />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  input_style: {
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  updateBtn: {
    fontSize: 16,
    color: 'blue',
    padding: 10,
  },
});

export default UpdateBtn;
