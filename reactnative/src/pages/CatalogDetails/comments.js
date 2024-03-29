import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import CommentLottie from '../../components/Loader/commentLottie';
import DarkCommentLottie from '../../components/Loader/darkCommentLottie';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Styles from '../../assets/Styles';
import axios from 'axios';
import {COMMENTS_URL, USERS_URL} from '@env';
import Divider from '../../components/Divider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import LoadingLoader from '../../components/Loader/darkLoadingLoader';

const Comments = ({catalogID}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState([]);
  const [descriptionText, setDescriptionText] = useState('');
  const [userPicture, setUserPicture] = useState('');
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState(null);
  const toast = useToast();
  const {t} = useTranslation();
  const darkMode = useSelector(state => state.theme.darkMode);
  const [loading, setLoading] = useState(true);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getComments = async url => {
    try {
      const response = await axios.get(url);
      const filteredComments = response.data.filter(
        c => c.catalog_id === catalogID,
      );
      setComment(filteredComments);
      setLoading(false);
    } catch (error) {
      console.log('Comment gelirken hata oluştu: ', error);
    }
  };

  const postComments = async () => {
    try {
      const data = {
        description: descriptionText,
        user_pic: userPicture,
        user_name: userName,
        catalog_id: catalogID,
      };
      await axios.post(COMMENTS_URL, data);
      getComments(COMMENTS_URL);
      setDescriptionText('');
    } catch (error) {
      console.log('Comment post edilirken hata oluştu: ', error);
    }
  };

  const deleteComment = async comment_id => {
    try {
      await axios.delete(`${COMMENTS_URL}/${comment_id}`);
      getComments(COMMENTS_URL);
      toast.show(`${comment_id} silindi.`, {
        type: 'success',
      });
    } catch (error) {
      console.log('Yorum silinirken hata oluştu: ', error);
    }
  };

  useEffect(() => {
    const getUserId = async () => {
      try {
        const getUserRoleFromStorage = await AsyncStorage.getItem('userRole');
        setUserRole(getUserRoleFromStorage);
        const getUserIdFromStorage = await AsyncStorage.getItem('userId');
        const response = await axios.get(
          `${USERS_URL}/${getUserIdFromStorage}`,
        );
        setUserPicture(response.data.user_pic);
        setUserName(response.data.user_name);
      } catch (error) {
        console.log('userAsync hata', error);
      }
    };
    getComments(COMMENTS_URL);
    getUserId();
  }, []);

  const commentsContainer = ({item}) => {
    // let date = new Date().toLocaleDateString('tr-TR');
    return (
      <View className="flex-row mx-2.5 pb-3">
        <Image
          source={{
            uri: `${item.user_pic}`,
          }}
          className="w-16 h-16 rounded-full"
        />
        <View className="mx-2.5 flex-1">
          <Text className="text-white font-remRegular">{`${item.user_name}`}</Text>
          <Text className="text-black font-remRegular">{`${item.description}`}</Text>
          {/* <Text className="font-remRegular">{date}</Text> */}
        </View>
        <View className="justify-center mx-2.5">
          {userRole === 'admin' ? (
            <TouchableOpacity onPress={() => deleteComment(item.comment_id)}>
              <FontAwesome
                name="trash-o"
                size={25}
                color={darkMode ? Styles.textColor : Styles.dark_text_color}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <Divider />
      </View>
    );
  };

  return (
    <View>
      <TouchableOpacity className="flex-row" onPress={toggleModal}>
        <Text
          className={`font-remRegular text-lg ${
            darkMode ? 'text-textColor' : 'text-dark_text_color'
          }`}>{`${t('Comments.comments')}...`}</Text>
        {darkMode ? <DarkCommentLottie /> : <CommentLottie />}
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View className="bg-[#618e6ced] rounded-2xl max-h-[60%] min-h-[60%]">
          <TouchableOpacity onPress={toggleModal} className="items-center">
            <FontAwesome name="close" size={30} color={Styles.textColor} />
          </TouchableOpacity>
          {loading ? (
            <LoadingLoader />
          ) : comment.length === 0 ? (
            <View className="justify-center items-center flex-1">
              <Text className="text-textColor font-remRegular">
                {t('Comments.noComments')}
              </Text>
            </View>
          ) : (
            <FlatList
              data={comment}
              renderItem={item => commentsContainer(item)}
            />
          )}

          <View className="flex-row items-center p-2">
            <TextInput
              placeholder={t('Comments.writeComment')}
              value={descriptionText}
              onChangeText={text => setDescriptionText(text)}
              className=" bg-white border p-5 text-xl my-2 rounded-xl flex-1 font-remRegular"
            />
            <TouchableOpacity className="mx-2.5" onPress={postComments}>
              <Text className="font-remRegular text-textColor">
                {t('Comments.send')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Comments;
