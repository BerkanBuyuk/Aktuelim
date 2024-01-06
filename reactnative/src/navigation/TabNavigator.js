import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainStackNavigator} from './StackNavigator';
import Favorites from '../pages/Favorites';
import ShopList from '../pages/ShopList';
import Entypo from 'react-native-vector-icons/dist/Entypo';
//MaterialIcons
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Markets"
        component={MainStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Anasayfa',
          tabBarIcon: () => <Entypo name="home" size={30} color="#000" />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="favorite" size={30} color="#000" />
          ),
        }}
      />
      <Tab.Screen
        name="ShopList"
        component={ShopList}
        options={{
          headerTitle: 'Alışveriş Listesi',
          tabBarLabel: 'Alışveriş Listesi',
          headerTitleAlign: 'center',
          tabBarIcon: () => <Entypo name="shop" size={30} color="#000" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
