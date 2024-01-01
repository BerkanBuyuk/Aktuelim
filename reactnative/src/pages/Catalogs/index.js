import {View, Text} from 'react-native';

const Catalogs = ({route}) => {
  return (
    <View style={{flex: 1}}>
      <Text>{route.params.catalog_title}</Text>
    </View>
  );
};

export default Catalogs;
