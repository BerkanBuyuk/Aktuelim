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
import Register from './src/auth/register';

const Aktuelim = () => (
  // <Provider store={store}>
  //   <I18nextProvider i18n={i18n}>
  //     <App />
  //   </I18nextProvider>
  // </Provider>
  <Register />
);

AppRegistry.registerComponent(appName, () => Aktuelim);
