import React from 'react';
import Catalogs from '../pages/Catalogs';
import CatalogDetails from '../pages/CatalogDetails';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ayarlar from '../components/Ayarlar';
import Notifications from '../components/Notifications';
import ContactUs from '../components/ContactUs';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import AddCatalogs from '../pages/AddCatalogs';
import {useTranslation} from 'react-i18next';
import Styles from '../assets/Styles';
import {useSelector} from 'react-redux';
import Markets from '../components/Markets';
import FavoriteBtn from '../components/FavoriteBtn';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const AyarlarStackNavigator = ({navigation}) => {
  const {t} = useTranslation();
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Ayarlar"
        component={Ayarlar}
        options={{
          headerShown: true,
          headerTitle: `${t('Settings.settings')}`,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: darkMode
              ? Styles.dark_base_color
              : Styles.baseColor,
          },
          headerTintColor: Styles.textColor,
          headerLeft: () => (
            <Entypo
              name="menu"
              size={35}
              color={Styles.textColor}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const NotificationsStackNavigator = ({navigation}) => {
  const {t} = useTranslation();
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerTitle: `${t('notifications')}`,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: darkMode
              ? Styles.dark_base_color
              : Styles.baseColor,
          },
          headerTintColor: Styles.textColor,
          headerLeft: () => (
            <Entypo
              name="menu"
              size={35}
              color={Styles.textColor}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const ContactUsStackNavigator = ({navigation}) => {
  const {t} = useTranslation();
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          headerTitle: `${t('contact_us')}`,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: darkMode
              ? Styles.dark_base_color
              : Styles.baseColor,
          },
          headerTintColor: Styles.textColor,
          headerLeft: () => (
            <Entypo
              name="menu"
              size={35}
              color={Styles.textColor}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const MainStackNavigator = ({fetchFavorites}) => {
  const {t} = useTranslation();
  const darkMode = useSelector(state => state.theme.darkMode);
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: darkMode ? Styles.dark_base_color : Styles.baseColor,
        },
        headerTintColor: Styles.textColor,
      }}>
      <Stack.Screen
        name="Home"
        component={Markets}
        options={{
          headerTitle: `${t('home')}`,
          headerTitleAlign: 'center',
          // headerTintColor: Styles.textColor,
          headerLeft: () => (
            <Entypo
              name="menu"
              size={35}
              color={Styles.textColor}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
          headerRight: () => (
            <AntDesign
              name="addfile"
              size={30}
              color={Styles.textColor}
              onPress={() => navigation.navigate('AddCatalogs')}
            />
          ),
        }}
      />

      <Stack.Screen
        name="Catalogs"
        component={Catalogs}
        options={{
          headerTitle: `${t('catalogs')}`,
          headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen
        name="CatalogDetails"
        component={CatalogDetails}
        options={({route}) => ({
          headerTitle: `${t('catalog_detail')}`,
          headerTitleAlign: 'center',
          headerRight: () => (
            <FavoriteBtn
              catalogId={route.params.catalog_id}
              catalogTitle={route.params.catalog_title}
              fetchFavorites={fetchFavorites}
            />
          ),
        })}
      />

      <Stack.Screen
        name="AddCatalogs"
        component={AddCatalogs}
        options={{
          headerTitle: `${t('add_catalog')}`,
          headerTitleAlign: 'center',
          headerRight: () => (
            <MaterialIcons
              name="add-a-photo"
              size={30}
              color={Styles.textColor}
              onPress={() => {
                null;
              }}
            />
          ),
          headerBackTitle: `${t('home')}`,
        }}
      />
    </Stack.Navigator>
  );
};

export {
  MainStackNavigator,
  AyarlarStackNavigator,
  NotificationsStackNavigator,
  ContactUsStackNavigator,
};
