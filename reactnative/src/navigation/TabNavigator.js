import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainStackNavigator} from './StackNavigator';
import Favorites from '../pages/Favorites';
import ShopList from '../pages/ShopList';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({navigation}) => {
  const {t} = useTranslation();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Markets"
        component={MainStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: `${t('home')}`,
          tabBarIcon: () => <Entypo name="home" size={30} color="#000" />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerTitleAlign: 'center',
          tabBarIcon: () => (
            <MaterialIcons name="favorite" size={30} color="#000" />
          ),
          headerTitle: `${t('favorites')}`,
          tabBarLabel: `${t('favorites')}`,
          headerLeft: () => (
            <Entypo
              name="menu"
              size={35}
              color="#000"
              style={{marginHorizontal: 20}}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ShopList"
        component={ShopList}
        options={{
          headerTitle: `${t('shop_list')}`,
          tabBarLabel: `${t('shop_list')}`,
          headerTitleAlign: 'center',
          tabBarIcon: () => <Entypo name="shop" size={30} color="#000" />,
          headerLeft: () => (
            <Entypo
              name="menu"
              size={35}
              color="#000"
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
