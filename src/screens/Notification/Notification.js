import {View, Text, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {
  NotificationListener,
  requestUserPermission,
  sendTestNotification,
} from '../../utils/pushnotifications_helper';
import {Colors} from '../../constants/Colors';
import HeaderComponent from '../../components/HeaderComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

export default function Notification() {
  const navigation = useNavigation();

  useEffect(() => {
    requestUserPermission();
    NotificationListener();
  }, []);

  const handleTestNotification = () => {
    sendTestNotification();
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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{paddingBottom: '5%'}}>Click to get notifications</Text>

        <TouchableOpacity
          onPress={handleTestNotification}
          style={{
            width: '60%',
            height: '8%',
            backgroundColor: 'red',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{color: Colors.whiteColor, fontWeight: '600', fontSize: 20}}>
            Get Notifications
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
