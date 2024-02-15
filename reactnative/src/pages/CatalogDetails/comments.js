import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import LoadingLoader from '../../components/Loader/loadingLoader';
import Modal from 'react-native-modal';
import CommentLottie from '../../components/Loader/commentLottie';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Styles from '../../assets/Styles';

const Comments = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  // const deviceWidth = Dimensions.get('window').height;
  // const deviceHeight = Dimensions.get('screen').height;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <TouchableOpacity className="flex-row" onPress={toggleModal}>
        <Text className="text-lg">Yorumlar...</Text>
        <CommentLottie />
      </TouchableOpacity>
      <Modal isVisible={isModalVisible} className="bg-red-500 rounded-2xl">
        <View className="bg-slate-600">
          <TouchableOpacity onPress={toggleModal} className="items-center">
            <FontAwesome name="close" size={30} color={Styles.textColor} />
          </TouchableOpacity>
          <View className="flex-row items-center">
            <TextInput
              // placeholder={t('AddCatalogs.catalogDescription')}
              placeholder="Yorum yaz."
              // value={catalogDescription}
              // onChangeText={text => setCatalogDescription(text)}
              className=" bg-white border p-5 text-xl my-2 rounded-xl flex-1"
            />
            <TouchableOpacity className="mx-2.5">
              <Text>Gönder</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Comments;
