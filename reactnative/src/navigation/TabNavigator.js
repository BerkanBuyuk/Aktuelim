import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainStackNavigator} from './StackNavigator';
import Favorites from '../pages/Favorites';
import ShopList from '../pages/ShopList';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {useTranslation} from 'react-i18next';
import Styles from '../assets/Styles';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({navigation}) => {
  const {t} = useTranslation();
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: darkMode ? Styles.dark_base_color : Styles.baseColor,
        },
        tabBarStyle: {
          backgroundColor: darkMode ? Styles.dark_base_color : Styles.baseColor,
        },
      }}>
      <Tab.Screen
        name="Markets"
        component={MainStackNavigator}
        options={{
          // tabBarStyle: {backgroundColor: Styles.baseColor},
          headerShown: false,
          tabBarLabel: `${t('home')}`,
          tabBarLabelStyle: {color: Styles.textColor, fontSize: 11},
          // headerTintColor: Styles.textColor,
          tabBarIcon: () => (
            <Entypo name="home" size={30} color={Styles.textColor} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          // tabBarStyle: {backgroundColor: Styles.baseColor},
          headerTitle: `${t('favorites')}`,
          tabBarLabel: `${t('favorites')}`,
          tabBarLabelStyle: {color: Styles.textColor, fontSize: 11},
          headerTitleAlign: 'center',
          // headerTitleStyle: {color: Styles.textColor},
          headerTintColor: Styles.textColor,
          tabBarIcon: () => (
            <MaterialIcons name="favorite" size={30} color={Styles.textColor} />
          ),
          headerLeft: () => (
            <Entypo
              name="menu"
              size={35}
              color={Styles.textColor}
              style={{marginHorizontal: 20}}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ShopList"
        component={ShopList}
        options={{
          // tabBarStyle: {backgroundColor: Styles.baseColor},
          headerTitle: `${t('shop_list')}`,
          tabBarLabel: `${t('shop_list')}`,
          tabBarLabelStyle: {fontSize: 11, color: Styles.textColor},
          headerTitleAlign: 'center',
          // tabBarActiveTintColor: Styles.textColor,
          // tabBarInactiveTintColor: Styles.inActiveTextColor,
          headerTitleStyle: {color: Styles.textColor},
          headerTintColor: Styles.textColor,
          tabBarIcon: () => (
            <Entypo name="shop" size={30} color={Styles.textColor} />
          ),
          headerLeft: () => (
            <Entypo
              name="menu"
              size={35}
              color={Styles.textColor}
              style={{marginHorizontal: 20}}
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
