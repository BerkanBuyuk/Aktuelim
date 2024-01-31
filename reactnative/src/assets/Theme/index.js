import {Switch, View, Text} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toggleDarkMode} from '../../redux/store/themeSlice';
import Styles from '../Styles';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Divider from '../../components/Divider';
import {useTranslation} from 'react-i18next';
import i18n from '../locales/services/i18next';

const Theme = () => {
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const darkMode = useSelector(state => state.theme.darkMode);
  const {t} = useTranslation();

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
    setIsEnabled(previousState => !previousState);
  };

  return (
    <View>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <MaterialIcons
            name={darkMode ? 'nightlight' : 'sunny'}
            size={30}
            color={darkMode ? Styles.textColor : Styles.dark_text_color}
          />
          <Text
            className={` ml-6 text-xl ${
              darkMode ? 'text-textColor' : 'text-dark_text_color'
            }`}>
            {(() => {
              if (!darkMode && i18n.language === 'tr') {
                return t('Settings.settings_theme_tr');
              } else if (!darkMode && i18n.language === 'en') {
                return t('Settings.settings_theme_en');
              } else if (darkMode && i18n.language === 'tr') {
                return t('Settings.settings_theme_dark_tr');
              } else if (darkMode && i18n.language === 'en') {
                return t('Settings.settings_theme_dark_en');
              }
            })()}
          </Text>
        </View>
        <View>
          <Switch
            trackColor={{false: Styles.dark_bg_color, true: Styles.baseColor}}
            thumbColor={isEnabled ? Styles.textColor : Styles.textColor}
            ios_backgroundColor={Styles.dark_bg_color}
            onValueChange={handleToggleDarkMode}
            value={isEnabled}
          />
        </View>
      </View>
      <Divider />
    </View>
  );
};

export default Theme;
