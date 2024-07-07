import {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {usefetchUploadsByProfile} from 'src/hooks/query';

interface Props {}
const UploadsTab: FC<Props> = props => {
  const {data, isLoading} = usefetchUploadsByProfile();
  console.log(data);
  return (
    <View style={styles.container}>
      <Text>UploadsTab</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UploadsTab;
