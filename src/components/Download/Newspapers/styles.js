import {StyleSheet} from 'react-native';
import {
  FONT_SIZE_10,
  FONT_SIZE_12,
  FONT_SIZE_16,
} from '../../../styles/fontSize';
import {getFontFamily} from '../../../utils/fontFamily';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../styles/metrics';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: FONT_SIZE_16,
    fontFamily: getFontFamily('normal'),
    color: '#A1A1A1',
    marginBottom: verticalScale(16),
  },
  button: {
    backgroundColor: '#BF1D2D',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  magazineItem: {
    width: horizontalScale(120),
    height: verticalScale(200),
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(10),
    gap: verticalScale(5),
    marginVertical: verticalScale(10),
  },
  magazineImage: {
    width: '100%',
    flex: 1,
    resizeMode: 'contain',
    borderRadius: moderateScale(10),
  },
  magazineTitle: {
    fontFamily: getFontFamily('semibold'),
    fontSize: FONT_SIZE_12,
  },
  magazineDate: {
    fontFamily: getFontFamily('normal'),
    fontSize: FONT_SIZE_10,
  },
  magazineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: horizontalScale(12),
    marginVertical: verticalScale(20),
  },
  magazineContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  contentWrapper: {
    paddingBottom: verticalScale(50),
  },
  moreBtn: {
    width: '20%',
  },
  moreIcon: {
    width: horizontalScale(30),
    height: verticalScale(30),
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
  },
  magazineDescription: {
    width: '80%',
  },
});

export default styles;
