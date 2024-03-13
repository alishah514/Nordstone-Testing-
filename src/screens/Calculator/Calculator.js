import React, {useState} from 'react';
import {View, Text, SafeAreaView, TextInput, Button} from 'react-native';
import CommonStyles from '../../common/CommonStyles';
import {Picker} from '@react-native-picker/picker';
import {Colors} from '../../constants/Colors';
import HeaderComponent from '../../components/HeaderComponent';

export default function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState('add');
  const [result, setResult] = useState('');

  const calculate = () => {
    let calculatedResult;
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    switch (operator) {
      case 'add':
        calculatedResult = n1 + n2;
        break;
      case 'subtract':
        calculatedResult = n1 - n2;
        break;
      case 'multiply':
        calculatedResult = n1 * n2;
        break;
      default:
        calculatedResult = 'Invalid operator';
        break;
    }

    setResult(calculatedResult.toString());
  };

  return (
    <SafeAreaView style={CommonStyles.container}>
      <HeaderComponent title={'Calculator'} />
      <View style={{alignItems: 'center'}}>
        <View style={{paddingTop: '5%', width: '100%'}}>
          <View
            style={{
              // backgroundColor: 'black',
              width: '80%',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Text>Enter First Value</Text>
            <TextInput
              style={{
                borderWidth: 2,
                marginBottom: 15,
                width: '80%',
                backgroundColor: Colors.placeholderBackgroundColor,
                borderColor: Colors.appColor,
                borderRadius: 10,
                paddingHorizontal: 15,
              }}
              onChangeText={text => setNum1(text)}
              value={num1}
              keyboardType="numeric"
              placeholder="Enter number 1"
            />
          </View>
          <View
            style={{
              // backgroundColor: 'black',
              width: '80%',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Text>Enter Second Value</Text>
            <TextInput
              style={{
                borderWidth: 2,
                marginBottom: 15,
                width: '80%',
                backgroundColor: Colors.placeholderBackgroundColor,
                borderColor: Colors.appColor,
                borderRadius: 10,
                paddingHorizontal: 15,
              }}
              onChangeText={text => setNum2(text)}
              value={num2}
              keyboardType="numeric"
              placeholder="Enter number 2"
            />
          </View>
        </View>
        <View
          style={{
            height: 50,
            width: '65%',
            borderBottomWidth: 2,
            borderColor: 'red', // Set the border color here
            // alignSelf: 'center',
            margin: '10%',
            borderRadius: 10,
          }}>
          <Picker
            selectedValue={operator}
            onValueChange={(itemValue, itemIndex) => setOperator(itemValue)}>
            <Picker.Item label="Addition" value="add" />
            <Picker.Item label="Subtraction" value="subtract" />
            <Picker.Item label="Multiplication" value="multiply" />
          </Picker>
        </View>
        <View style={{width: '60%', alignSelf: 'center'}}>
          <Button title="Calculate" onPress={calculate} />
        </View>
        <View
          style={{
            alignSelf: 'center',
            margin: '5%',
            padding: '2%',
            backgroundColor: Colors.appColor,
            borderRadius: 10,
            width: '30%',
            alignItems: 'center',
          }}>
          <Text style={{color: Colors.whiteColor}}>
            Result:{' '}
            <Text style={{fontWeight: '600', fontSize: 15}}>{result}</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
