import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AllNavigator from './src/navigation/AllNavigator';
import {ToastProvider} from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Styles from './src/assets/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setLanguage} from './src/redux/store/languageSlice';
import i18n from './src/assets/locales/services/i18next';

const App = () => {
  const dispatch = useDispatch();
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
        <AllNavigator />
      </NavigationContainer>
    </ToastProvider>
  );
};

export default App;
