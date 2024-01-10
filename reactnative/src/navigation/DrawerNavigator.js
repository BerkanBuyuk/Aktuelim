import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import {
  AyarlarStackNavigator,
  NotificationsStackNavigator,
} from './StackNavigator';
import {useTranslation} from 'react-i18next';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({navigation}) => {
  const {t} = useTranslation();
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          headerShown: false,
          drawerLabel: `${t('home')}`,
        }}
      />
      <Drawer.Screen
        name="Ayarlar1"
        component={AyarlarStackNavigator}
        options={{
          headerShown: false,
          drawerLabel: `${t('settings')}`,
          // drawerType: 'back',
        }}
      />
      <Drawer.Screen
        name="Notifications1"
        component={NotificationsStackNavigator}
        options={{
          headerShown: false,
          drawerLabel: `${t('notifications')}`,
          //   drawerType: 'back',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
