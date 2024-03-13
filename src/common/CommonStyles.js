import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';
const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainImage: {
    width: '70%',
    height: '35%',
    alignSelf: 'center',
    marginVertical: '10%',
  },
  paddingTop10: {paddingTop: '10%'},
  alignSelf: {alignSelf: 'center'},
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, // Adjust the zIndex to ensure it's above other components
  },

  // Input Field
  inputContainer: {
    width: '80%',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.appColor,
    backgroundColor: Colors.placeholderBackgroundColor,
    paddingHorizontal: '2%',
    height: '11%',
    marginBottom: '7%',
    borderRadius: 10,
  },
  InputField: {
    color: Colors.blackColor,
    fontSize: 15,
    marginLeft: '2%',
    fontWeight: '600',
  },

  //button
  buttonView: {
    width: '100%',
    height: '30%',
    backgroundColor: Colors.appColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  disabledButtonView: {
    width: '100%',
    height: '30%',
    backgroundColor: Colors.placeholderTextColor,
    borderColor: Colors.placeholderBackgroundColor,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonTitle: {
    color: Colors.whiteColor,
    fontWeight: '600',
    fontSize: 20,
  },
  titleBlackList: {
    color: Colors.blackColor,
    fontSize: 15,
    width: '40%',
  },
  disabledButtonTitle: {
    color: Colors.whiteColor,
    fontWeight: '600',
    fontSize: 20,
  },
});

export default CommonStyles;
