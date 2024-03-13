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

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('Ali512@yahoo.com');
  const [password, setPassword] = useState('GoodPassword123');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    setIsLoading(true);
    // Validate email
    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    // Validate password
    if (!isValidPassword(password)) {
      Alert.alert(
        'Invalid Password',
        'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number.',
      );
      return;
    }

    // Authenticate user

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('User Successfully Signed In');
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

  // Function to validate email
  const isValidEmail = email => {
    // Implement email validation logic here
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Function to validate password
  const isValidPassword = password => {
    // Implement password validation logic here
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/.test(password);
  };

  const clearStates = () => {
    setEmail('');
    setPassword('');
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
        <Text style={styles.welcomeText}>Login here</Text>
        <View style={styles.missedTextView}>
          <Text style={styles.missedText}>
            Welcome back you’ve been missed!
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
        <View
          style={{
            width: '80%',
            alignItems: 'flex-end',
          }}>
          <Text style={{color: Colors.appColor, fontWeight: '700'}}>
            Forgot your Password?
          </Text>
        </View>
        <View
          style={{
            width: '80%',
            marginTop: '10%',
            alignItems: 'center',
          }}>
          <Button
            isDisabled={email === '' || password === ''}
            title={'Sign in'}
            onPress={handleSignIn}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={{
              paddingTop: '10%',
            }}>
            <Text style={{color: Colors.lightBlackColor, fontWeight: '700'}}>
              Create a new account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
