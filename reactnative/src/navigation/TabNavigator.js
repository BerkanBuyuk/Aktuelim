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
import {FAVORITES_URL} from '@env';
import {Text} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({navigation}) => {
  const {t} = useTranslation();
  const darkMode = useSelector(state => state.theme.darkMode);
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(FAVORITES_URL);
      setFavorites(response.data);
    } catch (error) {
      console.error('Hata: ', error);
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="Markets"
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: darkMode ? Styles.dark_base_color : Styles.baseColor,
        },
        tabBarStyle: {
          backgroundColor: darkMode ? Styles.dark_base_color : Styles.baseColor,
          borderRadius: 15,
          marginHorizontal: 10,
          marginBottom: 30,
          position: 'absolute',
        },
        tabBarItemStyle: {
          borderRadius: 15,
        },
        tabBarActiveBackgroundColor: `${
          darkMode ? Styles.dark_text_color : Styles.textColor
        }`,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: Styles.textColor,
          fontFamily: 'REM-Regular',
        },
        headerTintColor: Styles.textColor,
      })}>
      <Tab.Screen
        name="Favorites"
        children={() => (
          <Favorites favorites={favorites} fetchFavorites={fetchFavorites} />
        )}
        options={{
          headerTitle: `${t('favorites')}`,
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: focused ? 14 : 12,
                fontFamily: 'REM-Regular',
                color: focused
                  ? darkMode
                    ? Styles.textColor
                    : Styles.baseColor
                  : darkMode
                  ? Styles.dark_categories_color
                  : Styles.categories_color,
              }}>
              {t('favorites')}
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="favorite"
              size={focused ? 30 : 25}
              color={
                focused
                  ? darkMode
                    ? Styles.textColor
                    : Styles.baseColor
                  : darkMode
                  ? Styles.dark_categories_color
                  : Styles.categories_color
              }
            />
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
        children={() => <MainStackNavigator fetchFavorites={fetchFavorites} />}
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: focused ? 14 : 12,
                fontFamily: 'REM-Regular',
                color: focused
                  ? darkMode
                    ? Styles.textColor
                    : Styles.baseColor
                  : darkMode
                  ? Styles.dark_categories_color
                  : Styles.categories_color,
              }}>
              {t('home')}
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Entypo
              name="home"
              size={focused ? 30 : 25}
              color={
                focused
                  ? darkMode
                    ? Styles.textColor
                    : Styles.baseColor
                  : darkMode
                  ? Styles.dark_categories_color
                  : Styles.categories_color
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="ShopList"
        component={ShopList}
        options={{
          headerTitle: `${t('ShopList.shop_list')}`,
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: focused ? 14 : 12,
                fontFamily: 'REM-Regular',
                color: focused
                  ? darkMode
                    ? Styles.textColor
                    : Styles.baseColor
                  : darkMode
                  ? Styles.dark_categories_color
                  : Styles.categories_color,
              }}>
              {t('ShopList.shop_list')}
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Entypo
              name="shop"
              size={focused ? 30 : 25}
              color={
                focused
                  ? darkMode
                    ? Styles.textColor
                    : Styles.baseColor
                  : darkMode
                  ? Styles.dark_categories_color
                  : Styles.categories_color
              }
            />
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
