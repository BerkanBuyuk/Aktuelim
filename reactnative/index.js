/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import i18n from './src/assets/locales/services/i18next';
import {I18nextProvider} from 'react-i18next';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {ToastProvider} from 'react-native-toast-notifications';
import Styles from './src/assets/Styles';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

const Aktuelim = () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
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
        <App />
      </ToastProvider>
    </I18nextProvider>
  </Provider>
  // <Register />
  // <Login />
);

AppRegistry.registerComponent(appName, () => Aktuelim);
