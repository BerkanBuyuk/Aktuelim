import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Text,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {CONTACT_ENDPOINT} from '@env';
import {useToast} from 'react-native-toast-notifications';
import {useTranslation} from 'react-i18next';
import LoadingLoader from '../../components/Loader/loadingLoader';
import Modal from 'react-native-modal';
import MailLottie from '../Loader/mailLottie';
import DarkLoadingLoader from '../Loader/darkLoadingLoader';

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
        const request = await axios.post(CONTACT_ENDPOINT, userData);
        toast.show(t('ContactMail.toast_success'), {type: 'success'});
        setUserNameSurname('');
        setUserMail('');
        setUserExplanation('');
        if (request.status === 200) {
          setModalVisible(false);
        }
      } catch (error) {
        console.log(error);
        toast.show(t('ContactMail.toast_danger'), {type: 'danger'});
      }
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className={` ${darkMode ? 'bg-dark_bg_color' : 'bg-light_bg_color'}`}>
      <View className="justify-center">
        <View className="items-center -mt-5">
          <MailLottie />
        </View>

        <TextInput
          placeholder={t('ContactMail.nameSurname')}
          style={{fontFamily: 'REM-Regular'}}
          value={userNameSurname}
          onChangeText={text => setUserNameSurname(text)}
          className=" bg-white border p-5 text-xl my-2.5 mx-2.5 rounded-xl"
        />
        <TextInput
          placeholder={t('ContactMail.mail')}
          style={{fontFamily: 'REM-Regular'}}
          value={userMail}
          onChangeText={text => setUserMail(text)}
          className=" bg-white border p-5 text-xl my-2 mx-2.5 rounded-xl"
        />
        <TextInput
          placeholder={t('ContactMail.explanation')}
          style={{fontFamily: 'REM-Regular'}}
          value={userExplanation}
          onChangeText={text => setUserExplanation(text)}
          multiline={true}
          numberOfLines={4}
          className="bg-white border p-5 text-xl my-2 mx-2.5 rounded-xl"
        />
        <TouchableOpacity
          onPress={handleMailPostRequest}
          className="items-center bg-baseColor rounded-2xl mx-20 my-5 p-4">
          <Text className="text-white text-2xl font-remRegular">
            {t('Comments.send')}
          </Text>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible}>
          <View>{darkMode ? <DarkLoadingLoader /> : <LoadingLoader />}</View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default ContactUs;
