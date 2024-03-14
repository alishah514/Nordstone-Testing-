import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

const styles = StyleSheet.create({
  mainTopView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '15%',
  },
  welcomeText: {color: Colors.appColor, fontWeight: '700', fontSize: 35},
  missedText: {
    color: Colors.blackColor,
    fontWeight: '400',
    fontSize: 15,
    textAlign: 'center',
  },
  missedTextView: {width: '80%', paddingTop: '5%'},
  mainView: {
    paddingTop: '15%',
    alignItems: 'center',
  },
  buttonView: {
    width: '80%',
    alignItems: 'center',
  },
  loginText: {
    color: Colors.lightBlackColor,
    fontWeight: '700',
    paddingTop: '5%',
  },
});
export default styles;
