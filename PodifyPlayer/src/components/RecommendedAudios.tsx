import AudioCard from '@ui/AudioCard';
import GridView from '@ui/GridView';
import PulseAnimationContainer from '@ui/PulseAnimationContainer';
import colors from '@utils/colors';
import {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {AudioData} from 'src/@types/audio';
import {useFetchRecommendedAudios} from 'src/hooks/query';
import {getPlayerState} from 'src/store/player';

interface Props {
  onAudioPress(item: AudioData, data: AudioData[]): void;
  onAudioLongPress(item: AudioData, data: AudioData[]): void;
}
const dummyData = new Array(6).fill('');

const RecommendedAudios: FC<Props> = ({onAudioLongPress, onAudioPress}) => {
  const {data = [], isLoading} = useFetchRecommendedAudios();
  const {onGoingAudio} = useSelector(getPlayerState);

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
            <AudioCard
              title={item.title}
              poster={item.poster}
              onPress={() => onAudioPress(item, data)}
              onLongPress={() => onAudioLongPress(item, data)}
              containerStyle={{width: '100%'}}
              playing={onGoingAudio?.id === item.id}
            />
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
  poster: {width: '100%', aspectRatio: 1, borderRadius: 7},
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
