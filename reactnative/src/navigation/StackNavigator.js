import React from 'react';
import Markets from '../pages/Markets';
import Catalogs from '../pages/Catalogs';
import CatalogDetails from '../pages/CatalogDetails';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button} from 'react-native';

const Stack = createNativeStackNavigator();

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

export {MainStackNavigator};
