import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import {
  AyarlarStackNavigator,
  NotificationsStackNavigator,
} from './StackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({navigation}) => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{headerShown: false, drawerLabel: 'Anasayfa'}}
      />
      <Drawer.Screen
        name="Ayarlar1"
        component={AyarlarStackNavigator}
        options={{
          headerShown: false,
          drawerLabel: 'Ayarlar',
          //   drawerType: 'back',
        }}
      />
      <Drawer.Screen
        name="Notifications1"
        component={NotificationsStackNavigator}
        options={{
          headerShown: false,
          drawerLabel: 'Bildirimler',
          //   drawerType: 'back',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
