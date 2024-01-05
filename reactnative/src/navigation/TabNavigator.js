import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainStackNavigator} from './StackNavigator';
import Favorites from '../pages/Favorites';
import ShopList from '../pages/ShopList';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Markets"
        component={MainStackNavigator}
        options={{headerShown: false, tabBarLabel: 'Anasayfa'}}
      />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen
        name="ShopList"
        component={ShopList}
        options={{
          headerTitle: 'Alışveriş Listesi',
          tabBarLabel: 'Alışveriş Listesi',
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
