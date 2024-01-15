import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import {
  AyarlarStackNavigator,
  NotificationsStackNavigator,
  ContactUsStackNavigator,
} from './StackNavigator';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import Styles from '../assets/Styles';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({navigation}) => {
  const {t} = useTranslation();
  const darkMode = useSelector(state => state.theme.darkMode);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: darkMode
          ? Styles.dark_categories_color
          : Styles.light_shopList_item,
        drawerStyle: {
          backgroundColor: darkMode
            ? Styles.dark_bg_color
            : Styles.light_bg_color,
        },
        drawerLabelStyle: {
          color: darkMode ? Styles.textColor : Styles.dark_text_color,
          fontSize: 16,
        },
      }}>
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          drawerLabel: `${t('home')}`,
        }}
      />
      <Drawer.Screen
        name="Ayarlar1"
        component={AyarlarStackNavigator}
        options={{
          drawerLabel: `${t('Settings.settings')}`,
        }}
      />
      <Drawer.Screen
        name="Notifications1"
        component={NotificationsStackNavigator}
        options={{
          drawerLabel: `${t('notifications')}`,
        }}
      />
      <Drawer.Screen
        name="ContactUs1"
        component={ContactUsStackNavigator}
        options={{
          drawerLabel: `${t('contact_us')}`,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
