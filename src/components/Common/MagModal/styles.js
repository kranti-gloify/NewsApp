import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../styles/metrics';
import {
  FONT_SIZE_14,
  FONT_SIZE_15,
  FONT_SIZE_16,
  FONT_SIZE_18,
  FONT_SIZE_22,
} from '../../../styles/fontSize';
import {getFontFamily} from '../../../utils/fontFamily';

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(20),
  },
  btnContainer: {
    gap: verticalScale(15),
  },
  btn: {
    width: '100%',
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(10),
  },
  icon: {
    width: horizontalScale(20),
    height: verticalScale(20),
    resizeMode: 'contain',
  },
  text: {
    fontSize: FONT_SIZE_15,
    fontFamily: getFontFamily('semibold'),
  },
});

export default styles;
