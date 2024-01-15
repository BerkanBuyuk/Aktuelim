import {View, Text, TextInput, FlatList, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import AddBtn from '../../components/AddBtn';
import DeleteBtn from '../../components/DeleteBtn';
import UpdateBtn from '../../components/UpdateBtn';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import Styles from '../../assets/Styles';

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
      <View style={styles.itemContainer}>
        <View
          style={[
            styles.item_text_holder_view,
            {
              backgroundColor: darkMode
                ? Styles.dark_shopList_item
                : Styles.light_shopList_item,
            },
          ]}>
          <Text style={styles.item_style}>{item.text}</Text>
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
      style={[
        styles.view_style,
        {
          backgroundColor: darkMode
            ? Styles.dark_bg_color
            : Styles.light_bg_color,
        },
      ]}>
      <View style={styles.input_addBtn_View}>
        <TextInput
          placeholder={t('ShopList.shopList_placeholder')}
          value={inputText}
          onChangeText={setInputText}
          style={[
            styles.input_style,
            {
              backgroundColor: darkMode
                ? Styles.dark_textInput_color
                : Styles.light_textInput_color,
            },
          ]}
        />
        <AddBtn onPress={addShopList} />
      </View>
      <FlatList data={list} renderItem={renderShopList} key={cat => cat.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  item_style: {
    padding: 20,
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    color: '#414a4c',
  },
  input_style: {
    borderWidth: 1,
    padding: 20,
    fontSize: 20,
    marginVertical: 8,
    // marginHorizontal: 16,
    // margin: 16,
    borderRadius: 10,
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    flex: 1,
  },
  input_addBtn_View: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    marginHorizontal: 16,
  },
  view_style: {
    flex: 1,
  },
  item_text_holder_view: {
    flex: 1,
    borderRadius: 10,
  },
});

export default ShopList;
