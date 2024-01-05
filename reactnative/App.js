import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AllNavigator from './src/navigation/AllNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <AllNavigator />
    </NavigationContainer>
  );
};

export default App;
