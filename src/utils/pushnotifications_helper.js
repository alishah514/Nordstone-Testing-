import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export async function requestUserPermission() {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      await getFCMToken();
    }
  } catch (error) {
    console.log('Error in requesting permission:', error);
  }
}

async function getFCMToken() {
  try {
    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
    console.log('Old token:', fcmtoken);

    if (!fcmtoken) {
      const hasPermission = await messaging().hasPermission();
      if (!hasPermission) {
        await messaging().requestPermission();
      }

      fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        await AsyncStorage.setItem('fcmtoken', fcmtoken);
        console.log('New Token:', fcmtoken);
      } else {
        console.log('FCM token not available');
      }
    }

    return fcmtoken;
  } catch (error) {
    console.log('Error in FCM Token:', error);
    Alert.alert('Error in FCM Token:', JSON.stringify(error));
    throw error;
  }
}

export async function sendTestNotification() {
  try {
    const fcmtoken = await getFCMToken();
    if (!fcmtoken) {
      console.log('FCM token not available');
      throw new Error('FCM token not available');
    }

    const response = await messaging().sendMessage({
      notification: {
        title: 'Custom Title',
        body: 'Custom Notification Body',
      },
      token: fcmtoken,
    });

    console.log('Test notification sent successfully:', response);

    // // Assuming response is null if there is no error but you should check the documentation of messaging() to verify this behavior.
    // if (response === null) {
    //   // Handle success action here
    //   Alert.alert(
    //     'Foreground notification sent successfully',
    //     `Notification Title: Test Notifications \nNotification Body: 'Hello Nordstone Development Team'`,
    //   );
    // }
  } catch (error) {
    console.log('Error sending test notification:', error);
    throw error;
  }
}

export function NotificationListener() {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage?.notification,
    );
  });

  messaging().onMessage(async remoteMessage => {
    console.log('Notification on foreground state:', remoteMessage);
    Alert.alert(
      'Notification on foreground state:',
      JSON.stringify(remoteMessage),
    );
  });

  // Register Kill State
  messaging().getInitialNotification(async remoteMessage => {
    if (remoteMessage) {
      console.log('Message handled in the Kill State!', remoteMessage);
    }
  });
}
