import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import CommonStyles from '../common/CommonStyles';

const Button = ({title, onPress, isDisabled, style}) => {
  const handlePress = () => {
    if (!isDisabled) {
      onPress();
    }
  };

  if (isDisabled) {
    return (
      <View style={[CommonStyles.disabledButtonView, style]}>
        <Text style={[CommonStyles.disabledButtonTitle]}>{title}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[CommonStyles.buttonView, style]}
      onPress={handlePress}>
      <Text style={[CommonStyles.buttonTitle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
