import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setLanguage} from './src/redux/store/languageSlice';
import i18n from './src/assets/locales/services/i18next';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/auth/login';
import Register from './src/auth/register';

const Stack = createNativeStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  useEffect(() => {
    const checkLanguageAndAccessToken = async () => {
      const localeLng = await AsyncStorage.getItem('language');
      const accessToken = await AsyncStorage.getItem('accessToken');
      setIsUserLoggedIn(!!accessToken);
      if (localeLng) {
        dispatch(setLanguage(localeLng));
        i18n.changeLanguage(localeLng);
      }
    };

    checkLanguageAndAccessToken();
  }, [dispatch]);

  if (isUserLoggedIn === null) {
    // return <FirstLoader />;
    return null;
  }

  if (isUserLoggedIn === false) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
