import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import Dialog from 'react-native-dialog';
import {useTranslation} from 'react-i18next';

const UpdateBtn = ({onUpdate, itemText}) => {
  const {t} = useTranslation();
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
      Alert.alert(t('ShopList.shopList_alertBtn'), '', [
        {
          text: t('ShopList.shopList_alertBtn_ok'),
          style: 'cancel',
        },
      ]);

      return false;
    }
    onUpdate(newText);
    setVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={showDialog}>
        <Text className="text-base text-blue-700 p-2.5">
          {t('ShopList.shopList_updateBtn')}
        </Text>
      </TouchableOpacity>
      <Dialog.Container visible={visible}>
        <Dialog.Title>{t('ShopList.shopList_dialogTitle')}</Dialog.Title>
        <TextInput
          value={newText}
          onChangeText={text => setNewText(text)}
          defaultValue={itemText}
          className="p-2.5 text-base border rounded-xl my-2.5 mx-2.5"
        />
        <Dialog.Button
          label={t('ShopList.shopList_dialogLeftbtnLabel')}
          onPress={handleCancel}
          color="red"
        />
        <Dialog.Button
          label={t('ShopList.shopList_dialogRightbtnLabel')}
          onPress={handleUpdate}
        />
      </Dialog.Container>
    </View>
  );
};

export default UpdateBtn;
