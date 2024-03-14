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
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
  },
  missedTextView: {width: '50%', paddingTop: '10%'},
  mainView: {
    paddingTop: '15%',
    alignItems: 'center',
  },
  forgotPassword: {
    width: '80%',
    alignItems: 'flex-end',
  },
  forgotPasswordText: {color: Colors.appColor, fontWeight: '700'},
  buttonView: {
    width: '80%',
    marginTop: '10%',
    alignItems: 'center',
  },
  paddingTop10: {
    paddingTop: '10%',
  },
  registerText: {color: Colors.lightBlackColor, fontWeight: '700'},
});
export default styles;
