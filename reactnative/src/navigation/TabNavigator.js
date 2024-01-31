import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainStackNavigator} from './StackNavigator';
import Favorites from '../pages/Favorites';
import ShopList from '../pages/ShopList';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {useTranslation} from 'react-i18next';
import Styles from '../assets/Styles';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {ANDROID_FAVORITES_URL, IOS_FAVORITES_URL} from '@env';
import {Platform} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({navigation}) => {
  const {t} = useTranslation();
  const darkMode = useSelector(state => state.theme.darkMode);

  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      if (Platform.OS === 'android') {
        const response = await axios.get(ANDROID_FAVORITES_URL);
        setFavorites(response.data);
      } else if (Platform.OS === 'ios') {
        const response = await axios.get(IOS_FAVORITES_URL);
        setFavorites(response.data);
      }
    } catch (error) {
      console.error('Hata: ', error);
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="Markets"
      screenOptions={{
        headerStyle: {
          backgroundColor: darkMode ? Styles.dark_base_color : Styles.baseColor,
        },
        tabBarStyle: {
          backgroundColor: darkMode ? Styles.dark_base_color : Styles.baseColor,
        },
      }}>
      <Tab.Screen
        name="Favorites"
        // component={Favorites}
        children={() => (
          <Favorites favorites={favorites} fetchFavorites={fetchFavorites} />
        )}
        options={{
          // tabBarStyle: {backgroundColor: Styles.baseColor},
          headerTitle: `${t('favorites')}`,
          tabBarLabel: `${t('favorites')}`,
          tabBarLabelStyle: {color: Styles.textColor, fontSize: 11},
          headerTitleAlign: 'center',
          // headerTitleStyle: {color: Styles.textColor},
          headerTintColor: Styles.textColor,
          tabBarIcon: () => (
            <MaterialIcons name="favorite" size={30} color={Styles.textColor} />
          ),
          headerLeft: () => (
            <Entypo
              name="menu"
              size={35}
              color={Styles.textColor}
              style={{marginHorizontal: 20}}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Markets"
        // component={MainStackNavigator}
        children={() => <MainStackNavigator fetchFavorites={fetchFavorites} />}
        options={{
          // tabBarStyle: {backgroundColor: Styles.baseColor},
          headerShown: false,
          tabBarLabel: `${t('home')}`,
          tabBarLabelStyle: {color: Styles.textColor, fontSize: 11},
          // headerTintColor: Styles.textColor,
          tabBarIcon: () => (
            <Entypo name="home" size={30} color={Styles.textColor} />
          ),
        }}
      />
      <Tab.Screen
        name="ShopList"
        component={ShopList}
        options={{
          // tabBarStyle: {backgroundColor: Styles.baseColor},
          headerTitle: `${t('ShopList.shop_list')}`,
          tabBarLabel: `${t('ShopList.shop_list')}`,
          tabBarLabelStyle: {fontSize: 11, color: Styles.textColor},
          headerTitleAlign: 'center',
          // tabBarActiveTintColor: Styles.textColor,
          // tabBarInactiveTintColor: Styles.inActiveTextColor,
          headerTitleStyle: {color: Styles.textColor},
          headerTintColor: Styles.textColor,
          tabBarIcon: () => (
            <Entypo name="shop" size={30} color={Styles.textColor} />
          ),
          headerLeft: () => (
            <Entypo
              name="menu"
              size={35}
              color={Styles.textColor}
              style={{marginHorizontal: 20}}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
