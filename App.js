import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/home'
import { Icon, Ionicons } from 'react-native-vector-icons';
import Feed from './src/pages/feed/Feed';
import Settings from './src/pages/settings/Settings';
import Login from './src/pages/login/Login';
import NewUser from './src/pages/new-user/NewUser';
import { createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splashscreen from './src/screens/Splashscreen';
import Success from './src/screens/Success';
const Tab = createBottomTabNavigator();
export const UserContext = createContext();

function MyTabs({ navigation, route }) {

  const [idUser, setIdUser] = useState(route.params.idUser);

  const storeUserId = async (value) => {
    try {
      await AsyncStorage.setItem('idUser', value)
    } catch (e) {
      // saving error
    }
  }

  useEffect(() => {
    storeUserId(route.params.idUser)
    console.log(route.params.idUser);
  },[])
  return (
    <UserContext.Provider value={{
      idUser,
      setIdUser
    }}>

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'alarm'
            } else if (route.name === 'Feed') {
              iconName = 'md-newspaper';
            } else if (route.name === 'Settings') {
              iconName = 'rocket';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#fa570a',
          inactiveTintColor: '#000a4c',
        }}

      >
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
        <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      </Tab.Navigator>
    </UserContext.Provider>
  );
}

const Stack = createStackNavigator();
export function AppStartupScreen() {

  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Success" component={Success} options={{ headerShown: false }} />
      <Stack.Screen name="Splash" component={Splashscreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="NewUser" component={NewUser} options={{ headerShown: false }} />
      <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false, headerLeft: null }} />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <AppStartupScreen />
    </NavigationContainer>
  );
}
