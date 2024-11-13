import {View, Text, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ICONS} from '../../../constants';
import styles from './styles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../styles/metrics';
import {useTheme} from '@react-navigation/native';
import Share from 'react-native-share';
import {useTranslation} from 'react-i18next';
import {Snackbar} from '../../../components/Common';
import {useDispatch, useSelector} from 'react-redux';
import {setDownloads} from '../../../redux/actions/user/userActions';

const MagDetail = ({navigation, route}) => {
  const {
    title,
    image,
    pdfLink,
    publishedBy,
    language,
    frequency,
    category,
    date,
  } = route.params.item;
  const itemType = route.params.itemType;
  const {colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const magazineDownloads = useSelector(
    state => state.user.additional.downloads.magazines,
  );
  const newspaperDownloads = useSelector(
    state => state.user.additional.downloads.newspapers,
  );
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (itemType === 'magazines') {
      // Check if the current magazine is already downloaded
      const isDownloaded = magazineDownloads.some(mag => mag.title === title);
      setDownloaded(isDownloaded);
    } else {
      const isDownloaded = newspaperDownloads.some(mag => mag.title === title);
      setDownloaded(isDownloaded);
    }
  }, [magazineDownloads, newspaperDownloads, title, itemType]);

  const handleShare = magUrl => {
    Share.open({url: magUrl})
      .then(res => {
        if (res.success) {
          setIsVisible(true);
          setMessage(t('screens.summary.snackbar.article_shared'));
        }
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  const payload = {
    item: itemType,
    details: {
      title: title,
      date: date,
      image: image,
      pdfLink: pdfLink,
      publishedBy: publishedBy,
      language: language,
      category: category,
      frequency: frequency,
    },
  };
  const handleDownload = () => {
    dispatch(setDownloads(payload));
    setDownloaded(true);
    setIsVisible(true);
    setMessage('File Downloaded!');
  };

  const removeDownload = () => {
    dispatch(removeDownload({item: itemType, title}));
    setDownloaded(false);
    setIsVisible(true);
    setMessage('Download Removed!');
  };
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          android_ripple={{
            color: 'lightgray',
            borderless: false,
            radius: moderateScale(12),
          }}>
          <Image
            source={ICONS.BACK}
            style={[styles.backIcon, {tintColor: colors.text}]}
          />
        </Pressable>
        <Text style={[styles.headerText, {color: colors.text}]}>{title}</Text>
      </View>
      <Pressable
        android_ripple={{color: 'lightgray', borderless: false}}
        style={[
          styles.magzineContainer,
          {backgroundColor: colors.bulletinBackground},
        ]}
        onPress={() =>
          navigation.navigate('MagViewer', {
            title: title,
            date: date,
            pdfLink: pdfLink,
          })
        }>
        <View style={styles.posterContainer}>
          <Image source={image} style={styles.poster} />
        </View>
        <View style={styles.subContainerRight}>
          <Text style={[styles.date, {color: colors.text}]} numberOfLines={1}>
            {date}
          </Text>
          <View style={styles.textContainer}>
            <Text style={[styles.label, {color: colors.text}]}>
              {'Published by'}
            </Text>
            <Text style={[styles.text, {color: colors.text}]}>
              {publishedBy}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.label, {color: colors.text}]}>
              {'Language'}
            </Text>
            <Text style={[styles.text, {color: colors.text}]}>{language}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.label, {color: colors.text}]}>
              {'Category'}
            </Text>
            <Text style={[styles.text, {color: colors.text}]}>{category}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.label, {color: colors.text}]}>
              {'Frequency'}
            </Text>
            <Text style={[styles.text, {color: colors.text}]}>{frequency}</Text>
          </View>
          <View style={styles.reactionContainer}>
            <Pressable android_ripple={{color: 'lightgray', borderless: false}}>
              <Image
                source={ICONS.LIKE}
                style={[
                  styles.reactionIcon,
                  {
                    tintColor: colors.icon,
                  },
                ]}
              />
            </Pressable>
            <View
              style={[styles.borderRight, {borderRightColor: colors.icon}]}
            />
            <Pressable
              android_ripple={{color: 'lightgray', borderless: false}}
              onPress={() => handleShare(pdfLink)}>
              <Image
                source={ICONS.SHARE}
                style={[styles.reactionIcon, {tintColor: colors.icon}]}
              />
            </Pressable>
            <View
              style={[styles.borderRight, {borderRightColor: colors.icon}]}
            />
            {downloaded ? (
              <Pressable
                android_ripple={{color: 'lightgray', borderless: false}}
                onPress={removeDownload}>
                <Image
                  source={ICONS.BIN}
                  style={[
                    styles.reactionIcon,
                    {
                      tintColor: colors.border,
                      width: horizontalScale(20),
                      height: verticalScale(20),
                    },
                  ]}
                />
              </Pressable>
            ) : (
              <Pressable
                android_ripple={{color: 'lightgray', borderless: false}}
                onPress={handleDownload}>
                <Image
                  source={ICONS.DOWNLOAD}
                  style={[styles.reactionIcon, {tintColor: colors.icon}]}
                />
              </Pressable>
            )}
          </View>
        </View>
      </Pressable>
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
    </View>
  );
};

export default MagDetail;
