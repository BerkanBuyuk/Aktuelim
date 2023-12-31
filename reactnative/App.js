import React from 'react';
import Home from './src/pages/Markets';
import Favorites from './src/pages/Favorites';
import ShopList from './src/pages/ShopList';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Markets from './src/pages/Markets';

const App = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Markets" component={Markets} />
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="ShopList" component={ShopList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
