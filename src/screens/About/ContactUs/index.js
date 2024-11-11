import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {ICONS} from '../../../constants';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../styles/metrics';
import {Button, Loader, Snackbar} from '../../../components/Common';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {saveUserEnquiry} from '../../../utils/helpers';

const ContactUs = ({navigation}) => {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackBarType, setSnackBarType] = useState('error');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // Handle form submission logic
    if (!name || !mobile || !email || !message) {
      setLoading(false);
      setSnackBarType('error');
      setSnackbarMsg('Please, fill all the details!');
      setIsVisible(true);
      return;
    }
    const response = await saveUserEnquiry({
      name: name,
      mobile: mobile,
      email: email,
      message: message,
    });
    if (response.status === 'Success') {
      setLoading(false);
      setSnackBarType('success');
      setSnackbarMsg(response.message);
      setIsVisible(true);
      setEmail('');
      setName('');
      setMobile('');
      setMessage('');
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } else {
      setLoading(false);
      setSnackBarType('error');
      setSnackbarMsg(response.message);
      setIsVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
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
          {t('screens.contact_us.title')}
        </Text>
      </View>
      <ScrollView>
        <View
          style={[
            styles.contactForm,
            {backgroundColor: colors.bulletinBackground},
          ]}>
          <Text style={[styles.subtitle, {color: colors.text}]}>
            {t('screens.contact_us.form.title')}
          </Text>

          <TextInput
            style={[styles.input, {color: colors.text}]}
            placeholder={t(
              'screens.contact_us.form.input.full_name_placeholder',
            )}
            value={name}
            onChangeText={setName}
            placeholderTextColor={colors.inputPlaceholder}
            maxLength={30}
          />
          <TextInput
            style={[styles.input, {color: colors.text}]}
            placeholder={t('screens.contact_us.form.input.mobile_placeholder')}
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
            placeholderTextColor={colors.inputPlaceholder}
            maxLength={10}
          />
          <TextInput
            style={[styles.input, {color: colors.text}]}
            placeholder={t('screens.contact_us.form.input.email_placeholder')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor={colors.inputPlaceholder}
            maxLength={30}
          />
          <TextInput
            style={[styles.input, {color: colors.text}, styles.messageInput]}
            placeholder={t('screens.contact_us.form.input.message_placeholder')}
            value={message}
            onChangeText={setMessage}
            multiline
            placeholderTextColor={colors.inputPlaceholder}
            maxLength={200}
          />

          <View style={styles.btnWrapper}>
            <Button
              text={t('screens.contact_us.btn.submit')}
              bgColor={colors.btnBackground}
              width={horizontalScale(300)}
              height={verticalScale(55)}
              borderRadius={moderateScale(30)}
              onPress={handleSubmit}
              variant="elevated"
            />
          </View>
        </View>
      </ScrollView>
      <Snackbar
        backgroundColor={colors.snackBar}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        message={snackbarMsg}
        actionText={'Dismiss'}
        onActionPress={() => setIsVisible(false)}
        position="top"
        textColor={colors.snackBarTxt}
        actionTextColor={colors.snackBar}
        type={snackBarType}
      />
      {loading && (
        <View style={styles.absoluteLoader}>
          <Loader />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default ContactUs;
