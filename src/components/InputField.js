import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import CommonStyles from '../common/CommonStyles';
import {Colors} from '../constants/Colors';

export default InputField = ({...rest}) => {
  return (
    <View style={CommonStyles.inputContainer}>
      <TextInput
        value={rest.value}
        multiline={rest.multiline}
        placeholder={rest.placeholder}
        style={CommonStyles.InputField}
        placeholderTextColor={Colors.placeholderTextColor}
        editable={!rest.disabled}
        {...rest}
      />
    </View>
  );
};
