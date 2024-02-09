import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Theme from '../../assets/Theme';
import {useSelector} from 'react-redux';
import Language from '../../assets/Language';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Styles from '../../assets/Styles';
import {useTranslation} from 'react-i18next';
import Divider from '../Divider';

const Settings = ({navigation}) => {
  const darkMode = useSelector(state => state.theme.darkMode);
  const {t} = useTranslation();
  return (
    <View
      className={`flex-1 p-6 ${
        darkMode ? 'bg-dark_bg_color' : 'bg-light_bg_color'
      }`}>
      <View className="mb-2.5">
        <Text className="font-bold text-2xl">
          {t('Settings.settings_account_title')}
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('SettingsUserInfo')}>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            {darkMode ? (
              <MaterialCommunityIcons
                name="account-cowboy-hat"
                size={30}
                color={Styles.textColor}
              />
            ) : (
              <MaterialCommunityIcons
                name="account-cog"
                size={30}
                color={Styles.dark_text_color}
              />
            )}
            <Text
              className={` ml-6 text-xl ${
                darkMode ? 'text-textColor' : 'text-dark_text_color'
              }`}>
              {t('Settings.settings_account')}
            </Text>
          </View>
          <View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={30}
              color={darkMode ? Styles.textColor : Styles.dark_text_color}
            />
          </View>
        </View>
      </TouchableOpacity>
      <Divider />
      <View className="mb-3.5">
        <Text className="font-bold text-2xl">
          {t('Settings.settings_app_title')}
        </Text>
      </View>
      <Theme />
      <Language />
    </View>
  );
};

export default Settings;
