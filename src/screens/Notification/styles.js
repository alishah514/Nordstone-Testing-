import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

const styles = StyleSheet.create({
  mainTopView: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  paddingBottom5: {paddingBottom: '5%'},
  buttonView: {
    width: '60%',
    height: '8%',
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {color: Colors.whiteColor, fontWeight: '600', fontSize: 20},
});
export default styles;
