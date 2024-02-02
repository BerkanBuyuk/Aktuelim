import {View, TextInput, TouchableOpacity} from 'react-native';
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
  const toast = useToast();
  const darkMode = useSelector(state => state.theme.darkMode);
  const {t} = useTranslation();

  const handleMailPostRequest = async () => {
    try {
      const userData = {
        nameSurname: userNameSurname,
        mail: userMail,
        explanation: userExplanation,
      };
      await axios.post(CONTACT_ENDPOINT, userData);
      toast.show('Mail başarıyla iletildi.', {type: 'success'});
      setUserNameSurname('');
      setUserMail('');
      setUserExplanation('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      className={`flex-1 justify-center mx-2.5 ${
        darkMode ? 'bg-dark_bg_color' : 'bg-light_bg_color'
      }`}>
      <TextInput
        placeholder="İsim Soyisim"
        // placeholder={t('AddCatalogs.catalogTitle')}
        value={userNameSurname}
        onChangeText={text => setUserNameSurname(text)}
        className=" bg-white border p-5 text-xl my-2 rounded-xl"
      />
      <TextInput
        placeholder="Mail"
        // placeholder={t('AddCatalogs.catalogTitle')}
        value={userMail}
        onChangeText={text => setUserMail(text)}
        className=" bg-white border p-5 text-xl my-2 rounded-xl"
      />
      <TextInput
        placeholder="Açıklama"
        value={userExplanation}
        onChangeText={text => setUserExplanation(text)}
        multiline={true}
        numberOfLines={4}
        className="bg-white border p-5 text-xl my-2 rounded-xl"
      />
      <TouchableOpacity
        className="items-center"
        onPress={handleMailPostRequest}>
        <MaterialCommunityIcons
          name="email-send"
          size={65}
          color={darkMode ? Styles.textColor : Styles.dark_text_color}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ContactUs;
