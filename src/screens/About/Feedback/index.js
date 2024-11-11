import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {ICONS} from '../../../constants';
import {moderateScale, verticalScale} from '../../../styles/metrics';
import {FONT_SIZE_16} from '../../../styles/fontSize';
import {useTheme} from '@react-navigation/native';
import {Button, Snackbar} from '../../../components/Common';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {saveUserFeedback} from '../../../utils/helpers';
import {useDispatch, useSelector} from 'react-redux';
import {saveFeedback} from '../../../redux/actions/user/userActions';

const Feedback = ({navigation}) => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const feedbackData = useSelector(state => state.user.additional.feedback);

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [snackBarType, setSnackBarType] = useState('error');

  useEffect(() => {
    setRating(feedbackData.data.rating);
    setFeedback(feedbackData.data.comment);
    setEmail(feedbackData.data.email);
  }, [feedbackData]);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          style={styles.starButton}
          disabled={feedbackData.status}>
          <Image
            source={i <= rating ? ICONS.STAR_FILL : ICONS.STAR}
            style={[styles.star, i <= rating ? {} : {tintColor: 'lightgray'}]}
          />
        </TouchableOpacity>,
      );
    }
    return stars;
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setSnackBarType('error');
      setMessage('Please select rating!');
      setIsVisible(true);
    } else {
      if (!feedback || !email) {
        setSnackBarType('error');
        setMessage('Please fill all the details!');
        setIsVisible(true);
      } else {
        const response = await saveUserFeedback({
          rating: rating,
          feedback: feedback,
          email: email,
        });
        const data = {
          rating: rating,
          comment: feedback,
          email: email,
        };
        if (response.status === 'Success') {
          setSnackBarType('success');
          setMessage('Feedback submitted successfully!');
          setIsVisible(true);
          dispatch(saveFeedback({status: true, data: data}));
          setTimeout(() => {
            navigation.goBack();
          }, 1000);
        } else {
          setSnackBarType('error');
          setMessage(response.message);
          setIsVisible(true);
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.header}>
        <Pressable
          android_ripple={{
            color: 'lightgray',
            borderless: true,
            radius: moderateScale(50),
          }}
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image
            source={ICONS.BACK}
            style={[styles.icon, {tintColor: colors.text}]}
          />
        </Pressable>
        <Text style={[styles.headerTitle, {color: colors.headerLabel}]}>
          {t('screens.feedback.title')}
        </Text>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Text
            style={[
              styles.label,
              {
                color: colors.text,
                marginVertical: verticalScale(30),
              },
            ]}>
            {t('screens.feedback.subtitle')}
          </Text>
          <View style={styles.starContainer}>{renderStars()}</View>

          <Text
            style={[
              styles.label,
              {marginTop: verticalScale(10), color: colors.text},
            ]}>
            {t('screens.feedback.text.input.experience_label')}
          </Text>
          <TextInput
            style={[
              styles.feedbackInput,
              {backgroundColor: colors.inputBackground},
            ]}
            editable={!feedbackData.status}
            placeholder={t(
              'screens.feedback.text.input.experience_placeholder',
            )}
            placeholderTextColor="#CCCCCC"
            multiline
            onChangeText={text => setFeedback(text)}
            value={feedback}
            maxLength={200}
          />

          <Text
            style={[
              styles.label,
              {marginTop: verticalScale(10), color: colors.text},
            ]}>
            {t('screens.feedback.text.input.email_label')}
          </Text>
          <TextInput
            style={[
              styles.emailInput,
              {backgroundColor: colors.inputBackground},
            ]}
            editable={!feedbackData.status}
            placeholder={t('screens.feedback.text.input.email_placeholder')}
            placeholderTextColor="#CCCCCC"
            keyboardType="email-address"
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </View>
      </ScrollView>
      <View style={styles.btnWrapper}>
        <Button
          text={t('screens.feedback.text.btn.submit')}
          bgColor={
            feedbackData?.status
              ? colors.disableBtnBackground
              : colors.btnBackground
          }
          width={'100%'}
          height={verticalScale(55)}
          variant="elevated"
          borderRadius={moderateScale(30)}
          textSize={FONT_SIZE_16}
          weight="bold"
          onPress={handleSubmit}
          disable={feedbackData?.status}
        />
      </View>
      <Snackbar
        backgroundColor={colors.snackBar}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        message={message}
        actionText={'Dismiss'}
        onActionPress={() => setIsVisible(false)}
        position="top"
        textColor={colors.snackBarTxt}
        actionTextColor={colors.snackBar}
        type={snackBarType}
      />
    </KeyboardAvoidingView>
  );
};

export default Feedback;
