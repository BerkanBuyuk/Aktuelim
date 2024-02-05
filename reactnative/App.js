import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import {ToastProvider} from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Styles from './src/assets/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setLanguage} from './src/redux/store/languageSlice';
import i18n from './src/assets/locales/services/i18next';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/auth/login';

const Stack = createNativeStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const isUserLoggedIn = true;
  useEffect(() => {
    const fetchLanguage = async () => {
      const localeLng = await AsyncStorage.getItem('language');
      if (localeLng) {
        dispatch(setLanguage(localeLng));
        i18n.changeLanguage(localeLng);
        // setIsEnabled(localeLng === 'en');
      }
    };

    fetchLanguage();
  }, [dispatch]);

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
        {isUserLoggedIn ? (
          <Stack.Navigator>
            <Stack.Screen
              name="DrawerNavigator"
              component={DrawerNavigator}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="LoginDrawerNavigator"
              component={DrawerNavigator}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </ToastProvider>
  );
};

export default App;
