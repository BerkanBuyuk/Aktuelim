import {TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/dist/Feather';
import RNFetchBlob from 'rn-fetch-blob';
import {Platform, PermissionsAndroid} from 'react-native';
import {useToast} from 'react-native-toast-notifications';

const DownloadBtn = ({catalogImage}) => {
  const [isDownload, setIsDownload] = useState(false);
  const toast = useToast();

  const getDownloadPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'File Download Permission',
          message: 'Your permission is required to save Files to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) return true;
    } catch (err) {
      console.log('err', err);
    }
  };

  const downloadFile = async url => {
    const {config, fs} = RNFetchBlob;
    const cacheDir = fs.dirs.DownloadDir;

    const filename = url.split('/').pop();
    const imagePath = `${cacheDir}/${filename}`;

    try {
      const configOptions = Platform.select({
        ios: {
          fileCache: true,
          path: imagePath,
          appendExt: filename.split('.').pop(),
        },
        android: {
          fileCache: true,
          path: imagePath,
          appendExt: filename.split('.').pop(),
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: imagePath,
            description: 'File',
          },
        },
      });

      const response = await RNFetchBlob.config(configOptions).fetch(
        'GET',
        url,
      );

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        if (Platform.OS === 'android') {
          getDownloadPermissionAndroid().then(granted => {
            if (granted) {
              downloadFile(catalogImage);
            }
          });
        } else if (Platform.OS === 'ios') {
          downloadFile(catalogImage).then(res => {
            RNFetchBlob.ios.previewDocument(res.path());
          });
        }
      }}
      className="mr-4">
      <Feather name="download" size={35} color="white" />
    </TouchableOpacity>
  );
};

export default DownloadBtn;
