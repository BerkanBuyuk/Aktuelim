import {View, Text, FlatList, Switch, StyleSheet, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Styles from '../../assets/Styles';
import Divider from '../Divider';
import {useSelector} from 'react-redux';
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import {ANDROID_BASE_URL, IOS_BASE_URL} from '@env';

const Notifications = () => {
  const [marketData, setMarketData] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  const darkMode = useSelector(state => state.theme.darkMode);

  const handleToggleNotifications = () => {
    setIsEnabled(previousState => !previousState);
  };

  const getMarkets = async url => {
    try {
      const response = await axios.get(`${url}/markets`);
      setMarketData(response.data);
    } catch (error) {
      console.log('Hata: ', error);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      getMarkets(ANDROID_BASE_URL);
    } else if (Platform.OS === 'ios') {
      getMarkets(IOS_BASE_URL);
    }
  }, []);

  const notificationsContainer = ({item}) => {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Fontisto
              name="shopping-store"
              size={30}
              color={darkMode ? Styles.textColor : Styles.dark_text_color}
            />
            <Text
              style={[
                styles.text,
                {color: darkMode ? Styles.textColor : Styles.dark_text_color},
              ]}>
              {item.market_name}
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <Switch
              trackColor={{false: Styles.dark_bg_color, true: Styles.baseColor}}
              thumbColor={isEnabled ? Styles.textColor : Styles.textColor}
              ios_backgroundColor={Styles.dark_bg_color}
              onValueChange={handleToggleNotifications}
              value={isEnabled}
            />
          </View>
        </View>
        <Divider />
      </View>
    );
  };

  return (
    <View
      style={[
        styles.view_style,
        {
          backgroundColor: darkMode
            ? Styles.dark_bg_color
            : Styles.light_bg_color,
        },
      ]}>
      <FlatList
        data={marketData}
        keyExtractor={item => item.market_id}
        renderItem={item => notificationsContainer(item)}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 16,
    // backgroundColor: 'red',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
    // backgroundColor: 'red',
  },
  rightContainer: {
    // marginLeft: 'auto',
  },
  text: {
    marginLeft: 25,
    fontSize: 20,
  },
  view_style: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
});
