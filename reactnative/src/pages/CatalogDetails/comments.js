import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {useState} from 'react';
import LoadingLoader from '../../components/Loader/loadingLoader';
import Modal from 'react-native-modal';
import CommentLottie from '../../components/Loader/commentLottie';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Styles from '../../assets/Styles';

const Comments = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('screen').height;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <TouchableOpacity className="flex-row" onPress={toggleModal}>
        <Text className="text-lg">Yorumlar...</Text>
        <CommentLottie />
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        className="bg-red-500 rounded-2xl"
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}>
        <View className="bg-black">
          <TouchableOpacity onPress={toggleModal} className="items-center">
            <FontAwesome name="close" size={30} color={Styles.textColor} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Comments;
