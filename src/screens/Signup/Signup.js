import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import CommonStyles from '../../common/CommonStyles';
import InputField from '../../components/InputField';
import {Colors} from '../../constants/Colors';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default function Signup() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const signupTest = () => {
    setIsLoading(true);
    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      setIsLoading(false);
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('User Created Successfully');
        navigation.navigate('Notification');
        clearStates();
      })
      .catch(error => {
        // Handle authentication errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error:', errorCode, errorMessage);
        Alert.alert('Error:', errorMessage);
        setIsLoading(false);
      });
  };

  const clearStates = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsLoading(false);
  };
  return (
    <SafeAreaView style={CommonStyles.container}>
      {isLoading && (
        <View style={CommonStyles.overlay}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}

      <View style={styles.mainTopView}>
        <Text style={styles.welcomeText}>Create Account</Text>
        <View style={styles.missedTextView}>
          <Text style={styles.missedText}>
            Create an account so you can explore the application
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingTop: '15%',
          alignItems: 'center',
        }}>
        <InputField
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Email"
        />
        <InputField
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Password"
        />
        <InputField
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          placeholder="Confirm Password"
        />

        <View
          style={{
            width: '80%',
            // marginTop: '10%',
            alignItems: 'center',
          }}>
          <Button
            isDisabled={
              email === '' || password === '' || confirmPassword === ''
            }
            title={'Sign Up'}
            onPress={signupTest}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                color: Colors.lightBlackColor,
                fontWeight: '700',
                paddingTop: '5%',
              }}>
              Already have an account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
