import {Switch, View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Styles from '../Styles';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Divider from '../../components/Divider';
import {useTranslation} from 'react-i18next';
import i18n from '../locales/services/i18next';
import {setLanguage} from '../../redux/store/languageSlice';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

const Language = () => {
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const {t} = useTranslation();
  const darkMode = useSelector(state => state.theme.darkMode);

  const handleLanguageChange = newLanguage => {
    dispatch(setLanguage(newLanguage));
    i18n.changeLanguage(newLanguage);
    setIsEnabled(previousState => !previousState);
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {darkMode ? (
            <Entypo name="language" size={30} color={Styles.textColor} />
          ) : (
            <Ionicons
              name="language"
              size={30}
              color={Styles.dark_text_color}
            />
          )}
          <Text
            style={[
              styles.text,
              {color: darkMode ? Styles.textColor : Styles.dark_text_color},
            ]}>
            {t('settings_language')}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Switch
            trackColor={{false: Styles.dark_bg_color, true: Styles.baseColor}}
            thumbColor={isEnabled ? Styles.textColor : Styles.textColor}
            ios_backgroundColor={Styles.dark_bg_color}
            onValueChange={() =>
              i18n.language === 'en'
                ? handleLanguageChange('tr')
                : handleLanguageChange('en')
            }
            value={isEnabled}
          />
        </View>
      </View>
      <Divider />
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 16,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    // marginLeft: 'auto',
  },
  text: {
    marginLeft: 25,
    fontSize: 20,
  },
});
