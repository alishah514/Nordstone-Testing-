import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

const styles = StyleSheet.create({
  alignCenter: {alignItems: 'center'},
  paddingTop5: {paddingTop: '5%'},
  textFieldInput: {width: '78%', paddingBottom: '2%'},
  inputStyles: {
    borderWidth: 2,
    marginBottom: 15,
    width: '80%',
    backgroundColor: Colors.placeholderBackgroundColor,
    borderColor: Colors.appColor,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  buttonView: {width: '40%', height: '30%', alignSelf: 'center'},
  width80: {width: '80%'},
  noteText: {
    marginBottom: '5%',
    color: Colors.blackColor,
    alignSelf: 'center',
    fontWeight: '600',
  },
  listView: {
    marginBottom: 10,
    backgroundColor: Colors.placeholderBackgroundColor,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: Colors.appColor,
    borderWidth: 2,
  },
  listText: {
    fontSize: 16,
    color: Colors.appColor,
    fontWeight: '600',
  },
});
export default styles;
