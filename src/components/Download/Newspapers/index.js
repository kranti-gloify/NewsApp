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

const NewspaperItem = ({item, colors, navigation, handleMore}) => (
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

const PlaceholderComponent = ({colors, t, navigation}) => {
  return (
    <View style={styles.contentContainer}>
      <Image source={ICONS.NEWSPAPER} style={styles.icon} />
      <Text style={styles.placeholderText}>
        {t('components.newspapers.text.placeholder_text')}
      </Text>

      <Button
        text={t('components.newspapers.text.btn.explore_newspapers')}
        bgColor={colors.btnBackground}
        variant="elevated"
        width={horizontalScale(220)}
        height={verticalScale(55)}
        borderRadius={moderateScale(30)}
        onPress={() =>
          navigation.navigate('BottomTab', {
            screen: 'Mags & Papers',
            params: {
              screen: 'Newspapers', // Targeting the Newspapers tab
            },
          })
        }
      />
    </View>
  );
};

const Newspapers = () => {
  const [newspaperItem, setNewspaperItem] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const magModalRef = useRef();
  const confirmationModalRef = useRef();
  const newspapers = useSelector(
    state => state.user.additional.downloads.newspapers,
  );
  const dispatch = useDispatch();

  const handleMore = item => {
    setNewspaperItem(item);
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
          setMessage('Newspaper Shared!');
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
    dispatch(removeDownloads({item: 'newspapers', title: newspaperItem.title}));
    confirmationModalRef.current.close();
  };

  const handleRemove = () => {
    magModalRef.current.close();
    confirmationModalRef.current.open();
  };

  if (newspapers.length === 0) {
    return (
      <PlaceholderComponent colors={colors} t={t} navigation={navigation} />
    );
  }
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.magazineContainer}>
          {newspapers.map((item, index) => {
            return (
              <NewspaperItem
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
        handleShare={() => handleShare(newspaperItem.pdfLink)}
        handleRemove={handleRemove}
      />
      <ConfirmationModal
        ref={confirmationModalRef}
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
        actionText={'Delete'}
        confirmText={'Are you sure you want to delete this\n newspaper?'}
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

export default Newspapers;
