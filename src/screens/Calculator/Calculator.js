import React, {useState} from 'react';
import {View, Text, SafeAreaView, TextInput, Button} from 'react-native';
import CommonStyles from '../../common/CommonStyles';
import {Picker} from '@react-native-picker/picker';
import HeaderComponent from '../../components/HeaderComponent';
import styles from './styles';

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
      <View style={styles.alignCenter}>
        <View style={styles.mainViewPadding}>
          <View style={styles.inputMainView}>
            <View style={styles.inputFieldText}>
              <Text>Enter First Value</Text>
            </View>
            <TextInput
              style={styles.inputStyles}
              onChangeText={text => setNum1(text)}
              value={num1}
              keyboardType="numeric"
              placeholder="Enter first number"
            />
          </View>
          <View style={styles.inputMainView}>
            <View style={styles.inputFieldText}>
              <Text>Enter Second Value</Text>
            </View>
            <TextInput
              style={styles.inputStyles}
              onChangeText={text => setNum2(text)}
              value={num2}
              keyboardType="numeric"
              placeholder="Enter second number"
            />
          </View>
        </View>
        <View style={styles.pickerView}>
          <Picker
            selectedValue={operator}
            onValueChange={(itemValue, itemIndex) => setOperator(itemValue)}>
            <Picker.Item label="Addition" value="add" />
            <Picker.Item label="Subtraction" value="subtract" />
            <Picker.Item label="Multiplication" value="multiply" />
          </Picker>
        </View>
        <View style={styles.buttonView}>
          <Button title="Calculate" onPress={calculate} />
        </View>
        <View style={styles.resultView}>
          <Text style={styles.whiteColor}>
            Result: <Text style={styles.resultText}>{result}</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
