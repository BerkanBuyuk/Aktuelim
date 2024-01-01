import {View, Text, Image} from 'react-native';

const Catalogs = ({route}) => {
  console.log(route);
  return (
    <View style={{flex: 1}}>
      <Text>{route.params.catalog_title}</Text>
      <Image
        source={{uri: `${route.params.catalog_image}`}}
        style={{width: 420, height: 550}}
      />
    </View>
  );
};

export default Catalogs;
