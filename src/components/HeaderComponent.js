import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {Colors} from '../constants/Colors';

const HeaderComponent = props => {
  return (
    <SafeAreaView style={!props.transparentView && styles.whiteScreenView}>
      <View style={styles.mainHeader}>
        <TouchableOpacity
          onPress={props.onLeftIconPressed && props.onLeftIconPressed}
          style={styles.eachView}>
          {props.customIcon && props.customIcon}
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          {props.title && (
            <Text
              style={[
                styles.titleText,
                props.width && {width: props.width},
                props.transparentView && {color: Colors.whiteColor},
              ]}>
              {props.title}
            </Text>
          )}
        </View>
        <TouchableOpacity
          onPress={props.onRightIconPressed && props.onRightIconPressed}
          style={styles.thirdView}>
          {props.rightIcon && props.rightIcon}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HeaderComponent;
const styles = StyleSheet.create({
  eachView: {width: '30%', paddingLeft: '5%'},
  thirdView: {width: '30%', alignItems: 'flex-end', paddingRight: '5%'},
  titleContainer: {flex: 1, alignItems: 'center'},
  titleText: {
    color: Colors.appColor,
    fontSize: 20,
    fontWeight: '600',
  },
  mainHeader: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  whiteScreenView: {
    backgroundColor: Colors.placeholderBackgroundColor,
    borderBottomWidth: 2,
    borderBottomColor: Colors.appColor,
  },
});
