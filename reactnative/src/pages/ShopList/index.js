import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({
  name: 'shopListDB',
  location: 'default',
});

const ShopList = () => {
  const [inputText, setInputText] = useState('');
  const [categories, setCategories] = useState([]);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ShopList (id INTEGER PRIMARY KEY AUTOINCREMENT, text VARCHAR(100))`,
        [],
        (sqlTx, res) => {
          console.log('Tablo oluşturuldu.');
        },
        error => {
          console.log('Hata:' + error.message);
        },
      );
    });
  };

  const addShopList = () => {
    if (!inputText) {
      alert('Eklemek istediğinizi yazın.');
      return false;
    }

    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO ShopList (text) VALUES (?)`,
        [inputText],
        (sqlTx, res) => {
          console.log(`${inputText} Eklendi.`);
          getShopList();
          setInputText('');
        },
        error => {
          console.log('Eklenirken hata oluştu.' + error.message);
        },
      );
    });
  };

  const getShopList = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ShopList ORDER BY id DESC`,
        [],
        (sqlTx, res) => {
          console.log('getCategory Başarılı.');
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({id: item.id, text: item.text});
            }
            setCategories(results);
          }
        },
        error => {
          console.log('getCategoryError:' + error.message);
        },
      );
    });
  };

  const renderShopList = ({item}) => {
    return (
      <View>
        <Text style={styles.item_style}>{item.text}</Text>
      </View>
    );
  };

  useEffect(() => {
    createTable();
    getShopList();
  }, []);

  return (
    <View>
      <TextInput
        placeholder="Eklemek istediğinizi yazın."
        value={inputText}
        onChangeText={setInputText}
        style={styles.input_style}
      />
      <Button title="Ekle" onPress={addShopList} />
      <FlatList
        data={categories}
        renderItem={renderShopList}
        key={cat => cat.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item_style: {
    backgroundColor: '#e0e0e0',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    fontSize: 20,
  },
  input_style: {
    borderWidth: 1,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    fontSize: 20,
  },
});

export default ShopList;
