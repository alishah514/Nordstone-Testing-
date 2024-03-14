import {StyleSheet} from 'react-native';
import {Colors} from '../../constants/Colors';

const styles = StyleSheet.create({
  mainTopView: {paddingTop: '10%', alignItems: 'center'},
  roundBox: {
    width: 150,
    height: 150,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
  },
  selectPhoto: {
    color: Colors.whiteColor,
    fontWeight: '600',
  },
  buttonView: {
    width: '50%',
    height: '25%',
    paddingTop: '5%',
    alignSelf: 'center',
  },
  listTextView: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
  },
  ListText: {
    color: Colors.blackColor,
    fontWeight: '600',
    fontSize: 15,
    marginBottom: '3%',
  },
  listTopView: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filenameText: {width: '30%', textAlign: 'center', color: Colors.blackColor},
  margin10: {margin: 10},
});
export default styles;
