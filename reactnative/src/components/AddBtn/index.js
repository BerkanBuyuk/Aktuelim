import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';

const AddBtn = ({onPress}) => {
  const {t} = useTranslation();
  return (
    <View className="items-center ml-3">
      <TouchableOpacity onPress={onPress}>
        <Text className="text-xl text-addBtn">
          {t('ShopList.shopList_addBtn')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddBtn;
