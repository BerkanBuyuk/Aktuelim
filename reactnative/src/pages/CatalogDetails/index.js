import {View, Image, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import LoadingLoader from '../../components/Loader/loadingLoader';

const CatalogDetails = ({route}) => {
  const darkMode = useSelector(state => state.theme.darkMode);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(route.params.catalog_image);
        setLoading(false);
      } catch (error) {
        console.error('Veri yüklenirken bir hata oluştu:', error);
        setErr('Veri yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };
    fetchData();
  }, [route.params.catalog_image]);

  return (
    <View
      className={`flex-1 p-2.5 justify-center content-center ${
        darkMode ? 'bg-dark_bg_color' : 'bg-light_bg_color'
      }`}>
      {loading ? (
        <LoadingLoader />
      ) : (
        <>
          {err ? ( // Yeni eklenen satır
            <Text className="text-red-600">{err}</Text> // Yeni eklenen satır
          ) : (
            <Image
              source={{uri: `${route.params.catalog_image}`}}
              className="w-full h-[calc(100vh/1.5)]"
            />
          )}
        </>
      )}
    </View>
  );
};

export default CatalogDetails;
