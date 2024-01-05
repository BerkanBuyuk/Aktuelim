import React from 'react';
import Markets from './src/pages/Markets';
import Favorites from './src/pages/Favorites';
import ShopList from './src/pages/ShopList';
import {NavigationContainer} from '@react-navigation/native';
import {MainStackNavigator} from './src/navigation/StackNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Catalogs from './src/pages/Catalogs';
import CatalogDetails from './src/pages/CatalogDetails';
import Ayarlar from './src/components/Ayarlar';
import Notifications from './src/components/Notifications';
import BottomTabNavigator from './src/navigation/TabNavigator';
import DrawerNavigator from './src/navigation/DrawerNavigator';

// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// const ScreenStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Market"
//         component={Markets}
//         options={{headerTitle: 'Anasayfa', headerTitleAlign: 'center'}}
//       />
//       <Stack.Screen
//         name="Catalogs"
//         component={Catalogs}
//         options={{headerTitle: 'Kataloglar', headerTitleAlign: 'center'}}
//       />
//       <Stack.Screen
//         name="CatalogDetails"
//         component={CatalogDetails}
//         options={{headerTitle: 'Detay', headerTitleAlign: 'center'}}
//       />
//     </Stack.Navigator>
//   );
// };

// const ScreenTab = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//         name="Markets"
//         component={ScreenStack}
//         options={{headerShown: false, tabBarLabel: 'Anasayfa'}}
//       />
//       <Tab.Screen name="Favorites" component={Favorites} />
//       <Tab.Screen
//         name="ShopList"
//         component={ShopList}
//         options={{
//           headerTitle: 'Alışveriş Listesi',
//           tabBarLabel: 'Alışveriş Listesi',
//           headerTitleAlign: 'center',
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// const ScreenDrawer = () => {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Notifications" component={Notifications} />
//       <Drawer.Screen name="Ayarlar" component={Ayarlar} />
//     </Drawer.Navigator>
//   );
// };

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default App;
