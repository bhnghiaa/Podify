import LatestUploads from '@components/LatestUploads';
import RecommendedAudios from '@components/RecommendedAudios';
import {FC} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

interface Props {}

const Home: FC<Props> = props => {
  return (
    <ScrollView style={styles.container}>
      <LatestUploads
        onAudioPress={item => {
          console.log(item);
        }}
        onAudioLongPress={() => {
          console.log('long press');
        }}
      />
      <RecommendedAudios
        onAudioPress={item => {
          console.log(item);
        }}
        onAudioLongPress={() => {
          console.log('long press');
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Home;
