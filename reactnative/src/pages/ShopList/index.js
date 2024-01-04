import {View, Text, TextInput, FlatList, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import AddButton from '../../components/AddButton';
import DeleteBtn from '../../components/DeleteBtn';

const db = openDatabase({
  name: 'shopListDB',
  location: 'default',
});

const ShopList = () => {
  const [inputText, setInputText] = useState('');
  const [list, setList] = useState([]);

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
            setList(results);
          }
        },
        error => {
          console.log('getCategoryError:' + error.message);
        },
      );
    });
  };

  const addShopList = () => {
    if (!inputText) {
      Alert.alert('Boş liste girilemez !', '', [
        {
          text: 'Tamam',
          style: 'destructive',
        },
      ]);

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

  const deleteShopList = id => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM ShopList WHERE id = ?`,
        [id],
        (sqlTx, res) => {
          console.log(`ID ${id} Silindi.`);
          setList(getShopList);
        },
        error => {
          console.log('Silme hatası:' + error.message);
        },
      );
    });
  };

  const renderShopList = ({item}) => {
    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <Text style={styles.item_style}>{item.text}</Text>
          <DeleteBtn onDelete={deleteShopList} itemId={item.id} />
        </View>
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
      <AddButton onPress={addShopList} />
      <FlatList data={list} renderItem={renderShopList} key={cat => cat.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  item_style: {
    backgroundColor: '#e0e0e0',
    padding: 20,
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
  },
  input_style: {
    borderWidth: 1,
    padding: 20,
    fontSize: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    // backgroundColor: 'yellow',
    flex: 1,
  },
});

export default ShopList;
