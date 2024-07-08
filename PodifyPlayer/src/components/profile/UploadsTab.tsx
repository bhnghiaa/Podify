import AudioListItem from '@ui/AudioListItem';
import AudioListLoadingUI from '@ui/AudioListLoadingUI';
import {FC} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import {useFetchUploadsByProfile} from 'src/hooks/query';

interface Props {}

const UploadsTab: FC<Props> = props => {
  const {data, isLoading} = useFetchUploadsByProfile();

  if (isLoading) return <AudioListLoadingUI />;

  return (
    <ScrollView style={styles.container}>
      {data?.map(item => {
        return <AudioListItem audio={item} />;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default UploadsTab;
