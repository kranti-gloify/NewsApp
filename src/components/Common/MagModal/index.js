import {View, Text, StatusBar, Pressable} from 'react-native';
import React, {forwardRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../styles/metrics';
import styles from './styles';
import {Image} from 'react-native';
import {ICONS} from '../../../constants';

const MagModal = ({height, handleShare, handleRemove}, ref) => {
  const {colors, dark} = useTheme();

  const changeStatusBar = () => {
    if (!dark) {
      StatusBar.setBackgroundColor('rgba(2, 2, 2, 0.25)', true);
      StatusBar.setBarStyle('dark-content', true);
    }
  };

  const changeStatusBarToInitial = () => {
    if (!dark) {
      StatusBar.setBackgroundColor(colors.background, true);
      StatusBar.setBarStyle(dark ? 'light-content' : 'dark-content', true);
    }
  };

  return (
    <RBSheet
      ref={ref}
      onOpen={changeStatusBar}
      onClose={changeStatusBarToInitial}
      height={height}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(2, 2, 2, 0.25)',
        },
        container: {
          backgroundColor: colors.bulletinBackground,
          borderTopStartRadius: moderateScale(20),
          borderTopEndRadius: moderateScale(20),
          elevation: 5,
          zIndex: 5,
        },
      }}
      customModalProps={{
        animationType: 'slide',
        statusBarTranslucent: true,
      }}
      openDuration={100}
      closeDuration={100}
      closeOnPressMask={true}
      closeOnPressBack={true}>
      <View style={styles.modalContainer}>
        <View style={styles.btnContainer}>
          <Pressable
            style={styles.btn}
            android_ripple={{
              color: 'lightgray',
              borderless: false,
              radius: moderateScale(10),
            }}
            onPress={handleShare}>
            <Image
              source={ICONS.SHARE}
              style={[styles.icon, {tintColor: colors.text}]}
            />
            <Text style={[styles.text, {color: colors.text}]}>Share</Text>
          </Pressable>
          <Pressable
            style={styles.btn}
            android_ripple={{
              color: 'lightgray',
              borderless: false,
              radius: moderateScale(10),
            }}
            onPress={handleRemove}>
            <Image
              source={ICONS.BIN}
              style={[styles.icon, {tintColor: colors.text}]}
            />
            <Text style={[styles.text, {color: colors.text}]}>
              Remove from downloads
            </Text>
          </Pressable>
        </View>
      </View>
    </RBSheet>
  );
};

export default forwardRef(MagModal);
