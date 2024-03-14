import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login/Login.js';
import Signup from '../screens/Signup/Signup.js';
import Splash from '../screens/Splash/Splash.js';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Notification from '../screens/Notification/Notification.js';
import Photo from '../screens/Photo/Photo.js';
import TextScreen from '../screens/TextScreen/TextScreen.js';
import Calculator from '../screens/Calculator/Calculator.js';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import the icon library
import {Colors} from '../constants/Colors.js';
import Settings from '../screens/Settings/Settings.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
};

// Bottom tab navigator for Notification, Text, Calculator, and other screens
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        ...screenOptions,
        tabBarStyle: {backgroundColor: Colors.placeholderBackgroundColor},
      }}>
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name="notifications"
              color={focused ? Colors.appColor : color}
              size={size}
            /> // Use icon component with the desired icon name
          ),
        }}
      />
      <Tab.Screen
        name="Photo"
        component={Photo}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name="camera"
              color={focused ? Colors.appColor : color}
              size={size}
            /> // Use icon component with the desired icon name
          ),
        }}
      />
      <Tab.Screen
        name="TextScreen"
        component={TextScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name="document-text"
              color={focused ? Colors.appColor : color}
              size={size}
            /> // Use icon component with the desired icon name
          ),
        }}
      />
      <Tab.Screen
        name="Calculator"
        component={Calculator}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name="calculator"
              color={focused ? Colors.appColor : color}
              size={size}
            /> // Use icon component with the desired icon name
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
