import {View, Text, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../constants/Colors';
import HeaderComponent from '../../components/HeaderComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Settings() {
  const navigation = useNavigation();

  useEffect(() => {
    // Create a channel for Android devices
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id', // You can give any unique channel ID
        channelName: 'Default Channel',
        channelDescription: 'A default channel for notifications',
      },
      created => console.log(`Channel created: ${created}`),
    );

    // Cleanup function to remove the channel when component unmounts
    return () => {
      PushNotification.deleteChannel('default-channel-id');
    };
  }, []);

  // Function to send a local notification
  const sendNotification = () => {
    PushNotification.localNotification({
      channelId: 'default-channel-id', // Specify the channel ID here
      title: 'Hey Nordstone!',
      message: 'Greetings to Nordstone Development Team!',
    });
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            navigation.navigate('Login');
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderComponent
        title={'Notifications'}
        onRightIconPressed={handleLogout}
        rightIcon={
          <MaterialIcons name="logout" size={25} color={Colors.appColor} />
        }
      />
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text style={{paddingBottom: '5%'}}>Click to get notifications</Text>

        <TouchableOpacity
          onPress={sendNotification}
          style={{
            width: 150,
            height: 50,
            backgroundColor: 'red',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: Colors.whiteColor,
              fontWeight: '600',
              fontSize: 16,
            }}>
            Get Notifications
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
