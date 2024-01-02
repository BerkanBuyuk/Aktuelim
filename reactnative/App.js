import React from 'react';
import Markets from './src/pages/Markets';
import Favorites from './src/pages/Favorites';
import ShopList from './src/pages/ShopList';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Catalogs from './src/pages/Catalogs';
import AddAlert from './src/components/AddAlert';
import DeleteBtn from './src/components/DeleteBtn';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Market"
        component={Markets}
        options={{headerTitle: 'Marketler', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Catalogs"
        component={Catalogs}
        options={{headerTitle: 'Kataloglar', headerTitleAlign: 'center'}}
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
            headerLeft: () => <DeleteBtn />,
            headerRight: () => <AddAlert />,
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
