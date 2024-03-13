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
});
export default styles;
