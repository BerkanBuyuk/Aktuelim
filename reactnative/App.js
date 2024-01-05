import React from 'react';
import Markets from './src/pages/Markets';
import Favorites from './src/pages/Favorites';
import ShopList from './src/pages/ShopList';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Catalogs from './src/pages/Catalogs';
import CatalogDetails from './src/pages/CatalogDetails';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Market"
        component={Markets}
        options={{headerTitle: 'Anasayfa', headerTitleAlign: 'center'}}
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

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Markets"
          component={ScreenStack}
          options={{headerShown: false, tabBarLabel: 'Anasayfa'}}
        />
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen
          name="ShopList"
          component={ShopList}
          options={{
            headerTitle: 'Alışveriş Listesi',
            tabBarLabel: 'Alışveriş Listesi',
            headerTitleAlign: 'center',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
