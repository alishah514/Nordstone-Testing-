import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

const styles = StyleSheet.create({
  welcomeTextView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
    paddingTop: '10%',
  },
  welcomeText: {color: Colors.appColor, fontWeight: '600', fontSize: 30},
  exploreText: {
    color: Colors.blackColor,
    fontWeight: '400',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default styles;
