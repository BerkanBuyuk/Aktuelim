import React, {useState} from 'react';
import Markets from '../pages/Markets';
import Catalogs from '../pages/Catalogs';
import CatalogDetails from '../pages/CatalogDetails';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ayarlar from '../components/Ayarlar';
import Notifications from '../components/Notifications';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

const Stack = createNativeStackNavigator();

const AyarlarStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Ayarlar"
        component={Ayarlar}
        options={{
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
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerTitle: 'Bildirimler',
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
          headerTitle: 'Anasayfa',
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
      <Stack.Screen
        name="Catalogs"
        component={Catalogs}
        options={{headerTitle: 'Kataloglar', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="CatalogDetails"
        component={CatalogDetails}
        options={{
          headerTitle: 'Katalog Detayı',
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
    </Stack.Navigator>
  );
};

export {MainStackNavigator, AyarlarStackNavigator, NotificationsStackNavigator};
