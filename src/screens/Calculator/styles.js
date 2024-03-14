import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

const styles = StyleSheet.create({
  alignCenter: {
    alignItems: 'center',
  },
  mainViewPadding: {paddingTop: '5%', width: '100%'},
  inputMainView: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  inputStyles: {
    borderWidth: 2,
    marginBottom: 15,
    width: '80%',
    backgroundColor: Colors.placeholderBackgroundColor,
    borderColor: Colors.appColor,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  pickerView: {
    height: 50,
    width: '65%',
    borderBottomWidth: 2,
    borderColor: Colors.appColor,
    margin: '10%',
    borderRadius: 10,
  },
  buttonView: {width: '60%', alignSelf: 'center'},
  resultView: {
    alignSelf: 'center',
    margin: '5%',
    padding: '2%',
    backgroundColor: Colors.appColor,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
  },
  whiteColor: {color: Colors.whiteColor},
  resultText: {fontWeight: '600', fontSize: 15},
  inputFieldText: {alignSelf: 'flex-start', paddingLeft: 32, padding: 5},
});
export default styles;
