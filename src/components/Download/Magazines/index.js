import {View, Text, Image, Pressable, ScrollView} from 'react-native';
import React, {useRef, useState} from 'react';
import styles from './styles';
import {Button, ConfirmationModal, Snackbar} from '../../Common';
import {useNavigation, useTheme} from '@react-navigation/native';
import {ICONS} from '../../../constants';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../styles/metrics';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import MagModal from '../../Common/MagModal';
import Share from 'react-native-share';
import {removeDownloads} from '../../../redux/actions/user/userActions';

const PlaceholderComponent = ({colors, t, navigation}) => {
  return (
    <View style={styles.contentContainer}>
      <Image source={ICONS.MAGAZINE} style={styles.icon} />
      <Text style={styles.placeholderText}>
        {t('components.magazines.text.placeholder_text')}
      </Text>

      <Button
        text={t('components.magazines.text.btn.explore_magazines')}
        bgColor={colors.btnBackground}
        variant="elevated"
        width={horizontalScale(220)}
        height={verticalScale(55)}
        borderRadius={moderateScale(30)}
        onPress={() =>
          navigation.navigate('BottomTab', {
            screen: 'Mags & Papers',
            params: {
              screen: 'Magazines', // Targeting the Magazines tab
            },
          })
        }
      />
    </View>
  );
};

const MagazineItem = ({item, colors, navigation, handleMore}) => (
  <Pressable
    android_ripple={{
      color: 'lightgray',
      borderless: false,
      radius: moderateScale(10),
    }}
    style={[styles.magazineItem, {backgroundColor: colors.bulletinBackground}]}
    onPress={() =>
      navigation.navigate('MagViewer', {
        title: item.title,
        date: item.date,
        pdfLink: item.pdfLink,
      })
    }>
    <Image source={item.image} style={styles.magazineImage} />
    <View style={styles.magazineContent}>
      <View style={styles.magazineDescription}>
        <Text
          style={[styles.magazineTitle, {color: colors.text}]}
          numberOfLines={1}
          aria-valuemax={10}>
          {item.title}
        </Text>
        <Text
          style={[styles.magazineDate, {color: colors.icon}]}
          numberOfLines={1}>
          {item.date}
        </Text>
      </View>
      <Pressable
        style={styles.moreBtn}
        android_ripple={{
          color: 'lightgray',
          borderless: false,
        }}
        onPress={handleMore}>
        <Image
          source={ICONS.MORE}
          style={[styles.moreIcon, {tintColor: colors.text}]}
        />
      </Pressable>
    </View>
  </Pressable>
);

const Magazines = () => {
  const [magazineItem, setMagazineItem] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const magModalRef = useRef();
  const confirmationModalRef = useRef();
  const magazines = useSelector(
    state => state.user.additional.downloads.magazines,
  );
  const dispatch = useDispatch();

  const handleMore = item => {
    setMagazineItem(item);
    if (magModalRef.current) {
      magModalRef.current.open();
    }
  };

  const handleShare = magUrl => {
    magModalRef.current.close();
    Share.open({url: magUrl, title: 'SHARE BRIEF USING'})
      .then(res => {
        if (res.success) {
          setIsVisible(true);
          setMessage('Magazine Shared!');
        }
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  const handleCancel = () => {
    confirmationModalRef.current.close();
  };
  const handleConfirm = () => {
    dispatch(removeDownloads({item: 'magazines', title: magazineItem.title}));
    confirmationModalRef.current.close();
  };

  const handleRemove = () => {
    magModalRef.current.close();
    confirmationModalRef.current.open();
  };

  if (magazines.length === 0) {
    return (
      <PlaceholderComponent colors={colors} t={t} navigation={navigation} />
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.magazineContainer}>
          {magazines.map((item, index) => {
            return (
              <MagazineItem
                item={item}
                key={index}
                colors={colors}
                navigation={navigation}
                handleMore={() => handleMore(item)}
              />
            );
          })}
        </View>
      </ScrollView>
      <MagModal
        ref={magModalRef}
        height={verticalScale(130)}
        handleShare={() => handleShare(magazineItem.pdfLink)}
        handleRemove={handleRemove}
      />
      <ConfirmationModal
        ref={confirmationModalRef}
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
        actionText={'Delete'}
        confirmText={'Are you sure you want to delete this\n magazine?'}
        height={verticalScale(200)}
        btnHeight={verticalScale(55)}
      />
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

export default Magazines;
