import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import Ayarlar from '../components/Ayarlar';
import Notifications from '../components/Notifications';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Ayarlar"
        component={Ayarlar}
        options={{headerShown: true}}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{headerTitleAlign: 'center'}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
