import {
  View,
  Text,
  SafeAreaView,
  Alert,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonStyles from '../../common/CommonStyles';
import firestore from '@react-native-firebase/firestore';
import Button from '../../components/Button';
import {Colors} from '../../constants/Colors';
import HeaderComponent from '../../components/HeaderComponent';
import styles from './styles';

export default function TextScreen() {
  const [texts, setTexts] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = firestore()
      .collection('texts')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        const textsArray = [];
        snapshot.forEach(doc => {
          textsArray.push({...doc.data(), id: doc.id});
        });
        setTexts(textsArray);
        setIsLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const sendText = async () => {
    setIsLoading(true);
    if (inputText.trim() === '') {
      Alert.alert('Error', 'Please enter some text');
      return;
    }

    try {
      await firestore().collection('texts').add({
        text: inputText.trim(),
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
      setInputText('');
      Alert.alert('Success', 'Text sent successfully');
      setIsLoading(false);
    } catch (error) {
      console.error('Error sending text:', error);
      Alert.alert('Error', 'Failed to send text');
      setIsLoading(false);
    }
  };

  const handleItemDelete = async itemId => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await firestore().collection('texts').doc(itemId).delete();
              setTexts(prevTexts =>
                prevTexts.filter(text => text.id !== itemId),
              );
              Alert.alert('Success', 'Item deleted successfully');
            } catch (error) {
              console.error('Error deleting item:', error);
              Alert.alert('Error', 'Failed to delete item');
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView style={CommonStyles.container}>
      <HeaderComponent title={'Text Screen'} />
      {isLoading && (
        <View style={CommonStyles.overlay}>
          <ActivityIndicator size="large" color={Colors.whiteColor} />
        </View>
      )}
      <View style={styles.alignCenter}>
        <View style={styles.paddingTop5} />
        <Text style={styles.textFieldInput}>
          Please Enter Text in the field
        </Text>

        <TextInput
          value={inputText}
          onChangeText={text => setInputText(text)}
          placeholder={'Enter Text to Firestore'}
          style={styles.inputStyles}
          placeholderTextColor={Colors.placeholderTextColor}
        />

        <View style={styles.buttonView}>
          <Button
            isDisabled={inputText === ''}
            title="Send Text"
            onPress={sendText}
          />
        </View>

        <View style={styles.width80}>
          <Text style={styles.noteText}>
            {'Note: '}
            Click on the Item to delete it
          </Text>
          <FlatList
            data={texts}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleItemDelete(item.id)}
                style={styles.listView}>
                <Text style={styles.listText}>{item?.text}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item?.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
