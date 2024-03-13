import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CommonStyles from '../../common/CommonStyles';
import styles from './styles';

export default function Splash() {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('Login');
    }, 5000);

    return () => clearTimeout(timeout); // Clear timeout on component unmount
  }, [navigation]);

  return (
    <SafeAreaView style={CommonStyles.container}>
      <Image
        style={CommonStyles.mainImage}
        source={require('../../../assets/images/Group.png')}
      />
      <View style={styles.welcomeTextView}>
        <Text style={styles.welcomeText}>
          Welcome to Nordstone Software Development
        </Text>
        <View style={CommonStyles.paddingTop10}>
          <Text style={styles.exploreText}>
            Please go ahead and explore the application for more information
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
