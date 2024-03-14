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
import CommonStyles from '../../common/CommonStyles';
import styles from './styles';

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
    <SafeAreaView style={CommonStyles.container}>
      <HeaderComponent
        title={'Notifications'}
        onRightIconPressed={handleLogout}
        rightIcon={
          <MaterialIcons name="logout" size={25} color={Colors.appColor} />
        }
      />
      <View style={styles.mainTopView}>
        <Text style={styles.paddingBottom5}>Click to get notifications</Text>

        <TouchableOpacity
          onPress={handleTestNotification}
          style={styles.buttonView}>
          <Text style={styles.buttonText}>Get Notifications</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
