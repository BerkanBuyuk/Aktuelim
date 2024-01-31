import {View, Text, FlatList, Switch, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Styles from '../../assets/Styles';
import Divider from '../Divider';
import {useSelector} from 'react-redux';
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import {MARKETS_URL} from '@env';
import LoadingLoader from '../Loader/loadingLoader';

const Notifications = () => {
  const [marketData, setMarketData] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  const darkMode = useSelector(state => state.theme.darkMode);
  const [loading, setLoading] = useState(true);

  const handleToggleNotifications = () => {
    setIsEnabled(previousState => !previousState);
  };

  const getMarkets = async url => {
    try {
      const response = await axios.get(url);
      setMarketData(response.data);
      setLoading(false);
    } catch (error) {
      console.log('Hata: ', error);
    }
  };

  useEffect(() => {
    getMarkets(MARKETS_URL);
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
          <View>
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
      {loading ? (
        <LoadingLoader />
      ) : (
        <FlatList
          data={marketData}
          keyExtractor={item => item.market_id}
          renderItem={item => notificationsContainer(item)}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
