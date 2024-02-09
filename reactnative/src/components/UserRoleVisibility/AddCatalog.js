import {TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Styles from '../../assets/Styles';
import {useNavigation} from '@react-navigation/native';

const AddCatalog = () => {
  const [userRole, setUserRole] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const getUserRoleFromStorage = await AsyncStorage.getItem('userRole');
        setUserRole(getUserRoleFromStorage);
      } catch (error) {
        console.log('Hata: ', error);
      }
    };

    getUserDetail();
  }, [userRole]);

  return (
    <View>
      {userRole === 'admin' ? (
        <TouchableOpacity onPress={() => navigation.navigate('AddCatalogs')}>
          <AntDesign name="addfile" size={30} color={Styles.textColor} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default AddCatalog;
