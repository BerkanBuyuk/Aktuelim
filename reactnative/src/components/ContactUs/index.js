import {View, TextInput, TouchableOpacity, Alert, Text} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {CONTACT_ENDPOINT} from '@env';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useToast} from 'react-native-toast-notifications';
import {useTranslation} from 'react-i18next';
import LoadingLoader from '../../components/Loader/loadingLoader';
import Modal from 'react-native-modal';
import Styles from '../../assets/Styles';

const ContactUs = () => {
  const [userNameSurname, setUserNameSurname] = useState('');
  const [userMail, setUserMail] = useState('');
  const [userExplanation, setUserExplanation] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const toast = useToast();
  const darkMode = useSelector(state => state.theme.darkMode);
  const {t} = useTranslation();

  const emailer = ['gmail', 'hotmail', 'outlook', 'yandex', 'yahoo'];
  const emailerCom = ['com'];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[com\s@]+$/;
  const isValidEmail = email => {
    const checkEmailer = emailer.includes(email.split('@')[1].split('.')[0]);
    const checkEmailerCom = emailerCom.includes(
      email.split('@')[1].split('.')[1],
    );
    if (checkEmailer && checkEmailerCom) {
      return emailRegex.test(email);
    }
    return false;
  };

  const handleMailPostRequest = async () => {
    if (!(userNameSurname && userMail && userExplanation)) {
      Alert.alert(t('ShopList.shopList_alertBtn'), '', [
        {
          text: t('ShopList.shopList_alertBtn_ok'),
          style: 'cancel',
        },
      ]);
    } else if (!isValidEmail(userMail)) {
      Alert.alert(t('ContactMail.error'), t('ContactMail.error_mail'), [
        {
          text: t('ShopList.shopList_alertBtn_ok'),
          style: 'cancel',
        },
      ]);
    } else {
      setModalVisible(true);
      try {
        const userData = {
          nameSurname: userNameSurname,
          mail: userMail,
          explanation: userExplanation,
        };
        const response = await axios.post(CONTACT_ENDPOINT, userData);
        toast.show(t('ContactMail.toast_success'), {type: 'success'});
        setUserNameSurname('');
        setUserMail('');
        setUserExplanation('');
        if (response.status === 200) {
          setModalVisible(false);
        }
      } catch (error) {
        console.log(error);
        toast.show(t('ContactMail.toast_danger'), {type: 'danger'});
      }
    }
  };

  return (
    <View
      className={`flex-1 justify-center ${
        darkMode ? 'bg-dark_bg_color' : 'bg-light_bg_color'
      }`}>
      <TextInput
        placeholder={t('ContactMail.nameSurname')}
        value={userNameSurname}
        onChangeText={text => setUserNameSurname(text)}
        className=" bg-white border p-5 text-xl my-2.5 mx-2.5 rounded-xl"
      />
      <TextInput
        placeholder={t('ContactMail.mail')}
        value={userMail}
        onChangeText={text => setUserMail(text)}
        className=" bg-white border p-5 text-xl my-2 mx-2.5 rounded-xl"
      />
      <TextInput
        placeholder={t('ContactMail.explanation')}
        value={userExplanation}
        onChangeText={text => setUserExplanation(text)}
        multiline={true}
        numberOfLines={4}
        className="bg-white border p-5 text-xl my-2 mx-2.5 rounded-xl"
      />
      <TouchableOpacity
        className="items-center"
        onPress={handleMailPostRequest}>
        {/* <Text className="text-xl">Gönder</Text> */}
        <MaterialCommunityIcons
          name="email-send"
          size={65}
          color={darkMode ? Styles.textColor : Styles.dark_text_color}
        />
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View>
          <LoadingLoader />
        </View>
      </Modal>
    </View>
  );
};

export default ContactUs;
