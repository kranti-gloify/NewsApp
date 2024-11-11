import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../styles/metrics';
import {
  FONT_SIZE_14,
  FONT_SIZE_16,
  FONT_SIZE_20,
} from '../../../styles/fontSize';
import {getFontFamily} from '../../../utils/fontFamily';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: horizontalScale(25),
    height: verticalScale(25),
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: FONT_SIZE_20,
    fontFamily: getFontFamily('bold'),
    flex: 1,
    textAlign: 'center',
  },
  contactForm: {
    marginTop: verticalScale(50),
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(30),
    paddingHorizontal: horizontalScale(20),
  },
  subtitle: {
    fontSize: FONT_SIZE_14,
    fontFamily: getFontFamily('semibold'),
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(5),
    marginBottom: verticalScale(20),
    fontSize: FONT_SIZE_16,
    fontFamily: getFontFamily('semibold'),
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  btnWrapper: {
    marginTop: verticalScale(20),
  },
  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  absoluteLoader: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
