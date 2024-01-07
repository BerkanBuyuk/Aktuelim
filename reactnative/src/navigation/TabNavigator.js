import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainStackNavigator} from './StackNavigator';
import Favorites from '../pages/Favorites';
import ShopList from '../pages/ShopList';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({navigation}) => {
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
          headerTitle: 'Favoriler',
          tabBarLabel: 'Favoriler',
          // headerLeft: () => (
          //   <Entypo
          //     name="menu"
          //     size={35}
          //     color="#000"
          //     onPress={() => {
          //       navigation.openDrawer();
          //     }}
          //   />
          // ),
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
          // headerLeft: () => (
          //   <Entypo
          //     name="menu"
          //     size={35}
          //     color="#000"
          //     onPress={() => {
          //       navigation.openDrawer();
          //     }}
          //   />
          // ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
