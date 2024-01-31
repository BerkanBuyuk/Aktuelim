import {View, Text, TextInput, FlatList, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import AddBtn from '../../components/AddBtn';
import DeleteBtn from '../../components/DeleteBtn';
import UpdateBtn from '../../components/UpdateBtn';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const db = openDatabase({
  name: 'shopListDB',
  location: 'default',
});

const ShopList = () => {
  const [inputText, setInputText] = useState('');
  const [list, setList] = useState([]);
  const {t} = useTranslation();
  const darkMode = useSelector(state => state.theme.darkMode);

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
          // console.log('getShopList Başarılı.');
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
      Alert.alert(t('ShopList.shopList_alertBtn'), '', [
        {
          text: t('ShopList.shopList_alertBtn_ok'),
          style: 'cancel',
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

  const updateShopList = (id, newText) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE ShopList SET text = ? WHERE id = ?`,
        [newText, id],
        (sqlTx, res) => {
          console.log(`ID ${id} Güncellendi.`);
          getShopList();
        },
        error => {
          console.log('Güncelleme hatası:' + error.message);
        },
      );
    });
  };

  const renderShopList = ({item}) => {
    return (
      <View className="flex-row justify-between items-center my-2 mx-4 flex-auto">
        <View
          className={`flex-1 rounded-lg border ${
            darkMode ? 'bg-dark_shopList_item' : 'bg-light_shopList_item'
          }`}>
          <Text className="p-5 text-xl rounded-xl flex-1">{item.text}</Text>
        </View>
        <UpdateBtn
          onUpdate={newText => updateShopList(item.id, newText)}
          itemText={item.text}
        />
        <DeleteBtn onDelete={deleteShopList} itemId={item.id} />
      </View>
    );
  };

  useEffect(() => {
    createTable();
    getShopList();
  }, []);

  return (
    <View
      className={`flex-1 ${
        darkMode ? 'bg-dark_bg_color' : 'bg-light_bg_color'
      }`}>
      <View className="flex-row items-center mx-4">
        <TextInput
          placeholder={t('ShopList.shopList_placeholder')}
          value={inputText}
          onChangeText={setInputText}
          className={`border p-5 text-xl my-2 rounded-xl flex-1 ${
            darkMode ? 'bg-dark_textInput_color' : 'bg-light_textInput_color'
          }`}
        />
        <AddBtn onPress={addShopList} />
      </View>
      <FlatList data={list} renderItem={renderShopList} key={cat => cat.id} />
    </View>
  );
};

export default ShopList;
