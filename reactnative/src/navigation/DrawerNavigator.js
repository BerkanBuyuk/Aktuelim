import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import {
  AyarlarStackNavigator,
  NotificationsStackNavigator,
  ContactUsStackNavigator,
} from './StackNavigator';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import Styles from '../assets/Styles';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import DrawerUserInfo from '../components/DrawerUserInfo';
import Entypo from 'react-native-vector-icons/dist/Entypo';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({navigation}) => {
  const {t} = useTranslation();
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <DrawerContentScrollView>
      <DrawerUserInfo />
      <DrawerItem
        label={t('home')}
        labelStyle={{
          fontFamily: 'REM-Regular',
          color: darkMode ? `${Styles.textColor}` : `${Styles.dark_text_color}`,
        }}
        icon={() => (
          <FontAwesome
            name="home"
            size={25}
            color={darkMode ? Styles.textColor : Styles.dark_text_color}
          />
        )}
        onPress={() => navigation.navigate('TabNavigator')}
      />
      <DrawerItem
        label={t('Settings.settings')}
        labelStyle={{
          fontFamily: 'REM-Regular',
          color: darkMode ? `${Styles.textColor}` : `${Styles.dark_text_color}`,
        }}
        icon={() => (
          <Ionicons
            name="settings"
            size={25}
            color={darkMode ? Styles.textColor : Styles.dark_text_color}
          />
        )}
        onPress={() => navigation.navigate('Ayarlar1')}
      />
      {/* <DrawerItem
        label={t('downloads')}
        icon={() => (
          <Entypo
            name="download"
            size={25}
            color={darkMode ? Styles.textColor : Styles.dark_text_color}
          />
        )}
        onPress={() => navigation.navigate('Downloads1')}
      /> */}
      <DrawerItem
        label={t('contact_us')}
        labelStyle={{
          fontFamily: 'REM-Regular',
          color: darkMode ? `${Styles.textColor}` : `${Styles.dark_text_color}`,
        }}
        icon={() => (
          <MaterialIcons
            name="quick-contacts-mail"
            size={25}
            color={darkMode ? Styles.textColor : Styles.dark_text_color}
          />
        )}
        onPress={() => navigation.navigate('ContactUs1')}
      />
      {/* <DrawerItem
        label="Çıkış yap"
        icon={() => (
          <MaterialCommunityIcons
            name="logout"
            size={25}
            color={darkMode ? Styles.textColor : Styles.dark_text_color}
          />
        )}
        // onPress={() => navigation.navigate('Login')}
      /> */}
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = ({navigation}) => {
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
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
        // options={{
        //   drawerLabel: `${t('home')}`,
        //   drawerIcon: () => (
        //     <FontAwesome
        //       name="home"
        //       size={25}
        //       color={darkMode ? Styles.textColor : Styles.dark_text_color}
        //     />
        //   ),
        // }}
      />
      <Drawer.Screen
        name="Ayarlar1"
        component={AyarlarStackNavigator}
        // options={{
        //   drawerLabel: `${t('Settings.settings')}`,
        //   drawerIcon: () => (
        //     <Ionicons
        //       name="settings"
        //       size={25}
        //       color={darkMode ? Styles.textColor : Styles.dark_text_color}
        //     />
        //   ),
        // }}
      />
      <Drawer.Screen
        name="Downloads1"
        component={NotificationsStackNavigator}
        // options={{
        //   drawerLabel: `${t('notifications')}`,
        //   drawerIcon: () => (
        //     <Ionicons
        //       name="notifications"
        //       size={25}
        //       color={darkMode ? Styles.textColor : Styles.dark_text_color}
        //     />
        //   ),
        // }}
      />
      <Drawer.Screen
        name="ContactUs1"
        component={ContactUsStackNavigator}
        // options={{
        //   drawerLabel: `${t('contact_us')}`,
        //   drawerIcon: () => (
        //     <MaterialIcons
        //       name="quick-contacts-mail"
        //       size={25}
        //       color={darkMode ? Styles.textColor : Styles.dark_text_color}
        //     />
        //   ),
        // }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
