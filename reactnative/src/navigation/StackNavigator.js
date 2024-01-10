import React, {useState} from 'react';
import Markets from '../pages/Markets';
import Catalogs from '../pages/Catalogs';
import CatalogDetails from '../pages/CatalogDetails';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ayarlar from '../components/Ayarlar';
import Notifications from '../components/Notifications';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import AddCatalogs from '../pages/AddCatalogs';
import {useTranslation} from 'react-i18next';

const Stack = createNativeStackNavigator();

const AyarlarStackNavigator = ({navigation}) => {
  const {t} = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Ayarlar"
        component={Ayarlar}
        options={{
          headerTitle: `${t('settings')}`,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Entypo
              name="menu"
              size={35}
              color="#000"
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
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerTitle: `${t('notifications')}`,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Entypo
              name="menu"
              size={35}
              color="#000"
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

const MainStackNavigator = ({navigation}) => {
  const {t} = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavoritePress = () => {
    setIsFavorite(prevIsFavorite => !prevIsFavorite);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Market"
        component={Markets}
        options={{
          headerTitle: `${t('home')}`,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Entypo
              name="menu"
              size={35}
              color="#000"
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
          headerRight: () => (
            <AntDesign
              name="addfile"
              size={30}
              color="#000"
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
        options={{
          headerTitle: `${t('catalog_detail')}`,
          headerTitleAlign: 'center',
          headerRight: () => (
            <MaterialIcons
              name={isFavorite ? 'favorite' : 'favorite-border'}
              size={35}
              color="red"
              onPress={() => {
                handleFavoritePress();
              }}
            />
          ),
        }}
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
              // color="red"
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

export {MainStackNavigator, AyarlarStackNavigator, NotificationsStackNavigator};
