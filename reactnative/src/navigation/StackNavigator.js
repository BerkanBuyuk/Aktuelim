import React from 'react';
import Catalogs from '../pages/Catalogs';
import CatalogDetails from '../pages/CatalogDetails';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from '../components/Settings';
import Downloads from '../components/Downloads';
import ContactUs from '../components/ContactUs';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import AddCatalogs from '../pages/AddCatalogs';
import {useTranslation} from 'react-i18next';
import Styles from '../assets/Styles';
import {useSelector} from 'react-redux';
import Markets from '../components/Markets';
import FavoriteBtn from '../components/FavoriteBtn';
import {useNavigation} from '@react-navigation/native';
import DownloadBtn from '../components/DownloadBtn';
import {View} from 'react-native';
import SettingsUserInfo from '../components/SettingsUserInfo';
import AddCatalog from '../components/UserRoleVisibility/AddCatalog';

const Stack = createNativeStackNavigator();

const AyarlarStackNavigator = ({navigation}) => {
  const {t} = useTranslation();
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Ayarlar"
        component={Settings}
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
      <Stack.Screen
        name="SettingsUserInfo"
        component={SettingsUserInfo}
        options={{
          headerShown: false,
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
        name="Downloads"
        component={Downloads}
        options={{
          headerTitle: `${t('downloads')}`,
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
          headerRight: () => <AddCatalog />,
        }}
      />

      <Stack.Screen
        name="Catalogs"
        component={Catalogs}
        options={({route}) => ({
          headerTitle: `${route.params.market_name}`,
          headerTitleAlign: 'center',
        })}
      />

      <Stack.Screen
        name="CatalogDetails"
        component={CatalogDetails}
        options={({route}) => ({
          headerTitle: `${route.params.catalog_title}`,
          headerTitleAlign: 'center',
          headerRight: () => (
            <View className="flex-row">
              <DownloadBtn catalogImage={route.params.catalog_image} />
              <FavoriteBtn
                catalogId={route.params.catalog_id}
                catalogTitle={route.params.catalog_title}
                fetchFavorites={fetchFavorites}
              />
            </View>
          ),
        })}
      />

      <Stack.Screen
        name="AddCatalogs"
        component={AddCatalogs}
        options={{
          headerTitle: `${t('add_catalog')}`,
          headerTitleAlign: 'center',
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
