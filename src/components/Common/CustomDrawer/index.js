import {
  View,
  Text,
  Image,
  Switch,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useRef, useState, useMemo} from 'react';
import styles from './styles';
import {ICONS, STRINGS} from '../../../constants';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  beforeScreen,
  changeCategory,
  saveuserTheme,
  setLogout,
} from '../../../redux/actions/user/userActions';
import CustomDropDown from '../CustomDropDown';
import ConfirmationModal from '../ConfirmationModal';
import {moderateScale, verticalScale} from '../../../styles/metrics';
import Share from 'react-native-share';
import Snackbar from '../Snackbar';
import {useTranslation} from 'react-i18next';

const CustomDrawer = () => {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [settingDropDown, setSettingDropDown] = useState(false);
  const [aboutDropDown, setAboutDropDown] = useState(false);
  const {colors} = useTheme();

  const currentTheme = useMemo(() => {
    // Memoize the theme to prevent unnecessary re-renders
    return colors.theme;
  }, [colors]);

  const user = useSelector(state => state.user) || {};

  const userTheme = user.preference.theme;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const bottomSheetRef = useRef();
  const {t} = useTranslation();

  const settings = [
    {
      label: t('components.drawer.text.settings.category'),
      onPress: () => {
        dispatch(beforeScreen('settings'));
        dispatch(changeCategory(true));
      },
    },
    {
      label: t('components.drawer.text.settings.language'),
      onPress: () => {
        navigation.navigate('Language');
      },
    },
    {
      label: t('components.drawer.text.settings.manage_live_ticker'),
      onPress: () => {
        navigation.navigate('ManageLiveTicker');
      },
    },
    // {
    //   label: t('components.drawer.text.settings.storage_preference'),
    //   onPress: () => {
    //     navigation.navigate('StoragePreference');
    //   },
    // },
  ];

  const aboutItems = [
    {
      label: t('components.drawer.text.about_items.terms_of_service'),
      onPress: () => {
        navigation.navigate('TOS');
      },
    },
    {
      label: t('components.drawer.text.about_items.contact_us'),
      onPress: () => {
        navigation.navigate('ContactUs');
      },
    },
    {
      label: t('components.drawer.text.about_items.feedback'),
      onPress: () => {
        navigation.navigate('Feedback');
      },
    },
  ];

  const handleCancel = () => {
    bottomSheetRef.current.close();
  };
  const handleConfirm = () => {
    dispatch(setLogout());
  };

  const toggleTheme = () => {
    const newTheme = userTheme === 'light' ? 'dark' : 'light';
    dispatch(saveuserTheme(newTheme));
  };

  const handleInvite = () => {
    Share.open({
      title: `You're invited to ${STRINGS.APP_NAME}`,
      url: 'https://github.com/Gloifyogesh/NewsApp',
    })
      .then(res => {
        if (res.success) {
          setIsVisible(true);
          setMessage(t('components.drawer.text.snackbar.invitation_sent'));
        }
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  const handleLogout = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    }
  };

  return (
    <>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Pressable style={styles.contentWrapper} onPress={() => {}}>
          <View style={{width: '100%'}}>
            <View style={styles.header}>
              <Pressable
                android_ripple={{
                  color: 'lightgray',
                  borderless: true,
                  radius: moderateScale(50),
                }}
                style={styles.backBtn}
                onPress={() => navigation.goBack()}>
                <Image
                  source={ICONS.BACK}
                  style={[styles.backIcon, {tintColor: colors.text}]}
                />
              </Pressable>
              <Text style={[styles.headerTitle, {color: colors.text}]}>
                {t('components.drawer.title')}
              </Text>
            </View>
            <View style={styles.menu}>
              <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
                <Image
                  source={ICONS.MOON}
                  style={[styles.menuIcon, {tintColor: colors.drawerIcon}]}
                />
                <Text style={[styles.menuLabel, {color: colors.drawerLabel}]}>
                  {t('components.drawer.text.dark_mode')}
                </Text>
                <Switch
                  style={styles.switch}
                  value={userTheme === 'dark'}
                  onValueChange={toggleTheme}
                  thumbColor={
                    userTheme === 'dark' ? colors.drawerLabel : 'white'
                  }
                  trackColor={{true: 'green', false: '#a0a0a0'}}
                />
              </TouchableOpacity>
              {/* <Pressable
                style={styles.menuItem}
                android_ripple={{
                  color: 'lightgray',
                  borderless: false,
                }}
                onPress={() => navigation.navigate('Downloads')}>
                <Image
                  source={ICONS.DOWNLOAD}
                  style={[styles.menuIcon, {tintColor: colors.drawerIcon}]}
                />
                <Text style={[styles.menuLabel, {color: colors.drawerLabel}]}>
                  {t('components.drawer.text.downloads')}
                </Text>
              </Pressable> */}
              {/* <Pressable
                style={styles.menuItem}
                android_ripple={{
                  color: 'lightgray',
                  borderless: false,
                }}
                onPress={() => navigation.navigate('Polls')}>
                <Image
                  source={ICONS.POLL}
                  style={[styles.menuIcon, {tintColor: colors.drawerIcon}]}
                />
                <Text style={[styles.menuLabel, {color: colors.drawerLabel}]}>
                  {t('components.drawer.text.polls')}
                </Text>
              </Pressable> */}
              <View style={{width: '100%'}}>
                <Pressable
                  style={styles.menuItem}
                  android_ripple={{
                    color: 'lightgray',
                    borderless: false,
                  }}
                  onPress={() => {
                    setAboutDropDown(false);
                    setSettingDropDown(!settingDropDown);
                  }}>
                  <Image
                    source={ICONS.SETTING}
                    style={[styles.menuIcon, {tintColor: colors.drawerIcon}]}
                  />
                  <Text style={[styles.menuLabel, {color: colors.drawerLabel}]}>
                    {t('components.drawer.text.my_preferences')}
                  </Text>
                  <Image
                    source={settingDropDown ? ICONS.DOWN_ARROW : ICONS.RIGHT}
                    style={[styles.rightIcon, {tintColor: colors.drawerIcon}]}
                  />
                </Pressable>
                <CustomDropDown
                  isOpen={settingDropDown}
                  dropDownItems={settings}
                />
              </View>
              <View style={{width: '100%'}}>
                <Pressable
                  style={styles.menuItem}
                  android_ripple={{
                    color: 'lightgray',
                    borderless: false,
                  }}
                  onPress={() => {
                    setSettingDropDown(false);
                    setAboutDropDown(!aboutDropDown);
                  }}>
                  <Image
                    source={ICONS.ABOUT}
                    style={[styles.menuIcon, {tintColor: colors.drawerIcon}]}
                  />
                  <Text style={[styles.menuLabel, {color: colors.drawerLabel}]}>
                    {t('components.drawer.text.about')}
                  </Text>
                  <Image
                    source={aboutDropDown ? ICONS.DOWN_ARROW : ICONS.RIGHT}
                    style={[styles.rightIcon, {tintColor: colors.drawerIcon}]}
                  />
                </Pressable>
                <CustomDropDown
                  isOpen={aboutDropDown}
                  dropDownItems={aboutItems}
                />
              </View>

              <Pressable
                style={styles.menuItem}
                onPress={handleInvite}
                android_ripple={{
                  color: 'lightgray',
                  borderless: false,
                }}>
                <Image
                  source={ICONS.INVITE}
                  style={[styles.menuIcon, {tintColor: colors.drawerIcon}]}
                />
                <Text style={[styles.menuLabel, {color: colors.drawerLabel}]}>
                  {t('components.drawer.text.invite_friends')}
                </Text>
              </Pressable>

              <Pressable
                android_ripple={{
                  color: 'lightgray',
                  borderless: false,
                }}
                style={styles.menuItem}
                onPress={handleLogout}>
                <Image
                  source={ICONS.LOGOUT}
                  style={[styles.menuIcon, {tintColor: colors.drawerIcon}]}
                />
                <Text style={[styles.menuLabel, {color: colors.drawerLabel}]}>
                  {t('components.drawer.text.logout')}
                </Text>
              </Pressable>
            </View>
          </View>
          <View>
            <Text
              style={[
                styles.menuLabel,
                styles.footer,
                {color: colors.drawerLabel},
              ]}>
              {'V-1.0'}
            </Text>
          </View>
          <ConfirmationModal
            ref={bottomSheetRef}
            handleCancel={handleCancel}
            handleConfirm={handleConfirm}
            actionText={t('components.drawer.text.action_text')}
            confirmText={t('components.drawer.text.confirm_text')}
            height={verticalScale(230)}
            btnHeight={verticalScale(60)}
          />
        </Pressable>
      </View>
      <Snackbar
        backgroundColor={colors.snackBar}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        message={message}
        actionText={'Dismiss'}
        onActionPress={() => setIsVisible(false)}
        position="bottom"
        textColor={colors.snackBarTxt}
        actionTextColor={colors.snackBar}
      />
    </>
  );
};

export default CustomDrawer;
