import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AllNavigator from './src/navigation/AllNavigator';
import {ToastProvider} from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Styles from './src/assets/Styles';

const App = () => {
  return (
    <ToastProvider
      placement="bottom"
      duration={2000}
      animationType="zoom-in"
      successColor={Styles.baseColor}
      dangerColor={Styles.dark_base_color}
      textStyle={{fontSize: 15}}
      offset={100}
      successIcon={
        <AntDesign name="check" size={30} color={Styles.textColor} />
      }
      dangerIcon={
        <AntDesign name="close" size={30} color={Styles.textColor} />
      }>
      <NavigationContainer>
        <AllNavigator />
      </NavigationContainer>
    </ToastProvider>
  );
};

export default App;
