import {View, Button, Alert, TextInput} from 'react-native';
import React, {useState} from 'react';

const AddAlert = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <View>
      <Button
        title="+"
        onPress={() => {
          Alert.prompt(
            'Yeni Ürün',
            'Listeye Ekle',
            [
              {
                text: 'İptal',
                onPress: () => console.log('İptale basıldı'),
                style: 'destructive',
              },
              {
                text: 'Ekle',
                onPress: value => {
                  console.log('Ekle basıldı:', value);
                  // 'value' burada TextInput'den alınan değeri temsil eder
                },
                style: 'default',
              },
            ],
            'plain-text', // Bu, TextInput'un türünü belirtir
            inputValue, // Bu, TextInput'un varsayılan değeridir
          );
        }}
      />
    </View>
  );
};

export default AddAlert;
