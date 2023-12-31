import React from 'react';
import Home from './src/pages/Home';
import Favorites from './src/pages/Favorites';
import ShopList from './src/pages/ShopList';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const App = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="ShopList" component={ShopList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
