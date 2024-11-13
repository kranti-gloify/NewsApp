import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../styles/metrics';
import {
  FONT_SIZE_16,
  FONT_SIZE_20,
  FONT_SIZE_22,
} from '../../../styles/fontSize';
import {getFontFamily} from '../../../utils/fontFamily';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(16),
    justifyContent: 'space-between',
  },
  backButton: {
    fontSize: 24,
    color: '#000',
    marginRight: 8,
  },
  backIcon: {
    width: horizontalScale(25),
    height: verticalScale(25),
    resizeMode: 'contain',
  },
  title: {
    flex: 1,
    fontSize: FONT_SIZE_20,
    fontFamily: getFontFamily('semibold'),
    textAlign: 'center',
    marginBottom: verticalScale(10),
  },
  subtitle: {
    fontSize: FONT_SIZE_16,
    marginVertical: verticalScale(10),
    fontFamily: getFontFamily('semibold'),
  },
  liveTickerContainer: {
    width: '100%',
    height: verticalScale(500),
    marginTop: verticalScale(20),
  },
  liveTickerAnimatedContent: {
    width: '100%',
    height: '50%',
  },
  liveTickerContent: {
    width: '100%',
    height: '100%',
  },
  manageBtn: {
    position: 'absolute',
    left: 1,
    top: verticalScale(100),
    width: horizontalScale(30),
    height: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(15),
    elevation: 1,
    zIndex: 5,
    borderWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.5)',
  },
  manageBtnText: {
    fontSize: FONT_SIZE_22,
    fontFamily: getFontFamily('semibold'),
    color: 'white',
  },
  btnIcon: {
    width: horizontalScale(15),
    height: verticalScale(15),
    resizeMode: 'contain',
  },
  dragger: {
    position: 'absolute',
    right: 5,
    top: verticalScale(100),
    width: horizontalScale(30),
    height: verticalScale(35),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(15),
    elevation: 1,
    zIndex: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default styles;
