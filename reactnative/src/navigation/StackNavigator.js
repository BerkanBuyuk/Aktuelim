import React from 'react';
import Markets from '../pages/Markets';
import Catalogs from '../pages/Catalogs';
import CatalogDetails from '../pages/CatalogDetails';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button} from 'react-native';
import Ayarlar from '../components/Ayarlar';
import Notifications from '../components/Notifications';

const Stack = createNativeStackNavigator();

const AyarlarStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Ayarlar"
        component={Ayarlar}
        options={{
          // headerTitle: 'Detay',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Button
              title="+"
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
            <Button
              title="-"
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
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Market"
        component={Markets}
        options={{
          headerTitle: 'Anasayfa',
          headerTitleAlign: 'center',
          // headerShown: false,
          headerLeft: () => (
            <Button
              title="+"
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
        options={{headerTitle: 'Detay', headerTitleAlign: 'center'}}
      />
    </Stack.Navigator>
  );
};

export {MainStackNavigator, AyarlarStackNavigator, NotificationsStackNavigator};
