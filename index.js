/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp({
    // Your Firebase config object
  });
}

AppRegistry.registerComponent(appName, () => App);
