import {View, Text, SafeAreaView, TouchableOpacity, Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function Settings() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Currently you Are on Settings Screen</Text>
        <Button
          onPress={() => navigation.navigate('Notification')}
          color={'blue'}
          title="Go to Notification"
        />
      </View>
    </SafeAreaView>
  );
}
