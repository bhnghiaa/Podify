import GridView from '@ui/GridView';
import PulseAnimationContainer from '@ui/PulseAnimationContainer';
import colors from '@utils/colors';
import {FC} from 'react';
import {View, StyleSheet, Text, Image, Pressable} from 'react-native';
import {AudioData} from 'src/@types/audio';
import {useFetchRecommendedAudios} from 'src/hooks/query';

interface Props {
  onAudioPress(item: AudioData, data: AudioData[]): void;
  onAudioLongPress(item: AudioData, data: AudioData[]): void;
}
const dummyData = new Array(6).fill('');

const RecommendedAudios: FC<Props> = ({onAudioLongPress, onAudioPress}) => {
  const {data = [], isLoading} = useFetchRecommendedAudios();

  const getPoster = (poster?: string) => {
    return poster ? {uri: poster} : require('../assets/music.png');
  };

  if (isLoading)
    return (
      <PulseAnimationContainer>
        <View style={styles.container}>
          <View style={styles.dummyTitleView} />
          <GridView
            col={3}
            data={dummyData}
            renderItem={item => {
              return <View style={styles.dummyAudioView} />;
            }}
          />
        </View>
      </PulseAnimationContainer>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You may like this</Text>
      <GridView
        col={3}
        data={data || []}
        renderItem={item => {
          return (
            <Pressable
              onPress={() => onAudioPress(item, data)}
              onLongPress={() => onAudioLongPress(item, data)}>
              <Image source={getPoster(item.poster)} style={styles.poster} />
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.audioTitle}>
                {item.title}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  audioTitle: {
    color: colors.CONTRAST,
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
  },
  poster: {width: 100, height: 100, borderRadius: 7},
  dummyTitleView: {
    height: 20,
    width: 150,
    backgroundColor: colors.INACTIVE_CONTRAST,
    marginBottom: 15,
    borderRadius: 5,
  },
  dummyAudioView: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.INACTIVE_CONTRAST,
    borderRadius: 5,
  },
});

export default RecommendedAudios;
