import deepEqual from 'deep-equal';
import {useEffect} from 'react';
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  State,
  Track,
  usePlaybackState,
} from 'react-native-track-player';
import {useDispatch, useSelector} from 'react-redux';
import {AudioData} from 'src/@types/audio';
import {
  getPlayerState,
  updateOnGoingAudio,
  updateOnGoingList,
} from 'src/store/player';

const updateQueue = async (data: AudioData[]) => {
  const lists: Track[] = data.map(item => {
    return {
      id: item.id,
      title: item.title,
      url: item.file,
      artwork: item.poster || require('../assets/music.png'),
      artist: item.owner.name,
      genre: item.category,
      isLiveStream: true,
    };
  });
  await TrackPlayer.add([...lists]);
};
let isReady = false;
const useAudioController = () => {
  const {state: playbackState} = usePlaybackState() as {state?: State};
  const isPlayerReady = playbackState !== State.None;
  const isPlaying = playbackState === State.Playing;
  const isPaused = playbackState === State.Paused;
  const isBusy =
    playbackState === State.Buffering || playbackState === State.Connecting;

  const dispatch = useDispatch();
  const {onGoingAudio, onGoingList} = useSelector(getPlayerState);

  const onAudioPress = async (item: AudioData, data: AudioData[]) => {
    if (!isPlayerReady) {
      await updateQueue(data);
      const index = data.findIndex(audio => audio.id === item.id);
      await TrackPlayer.skip(index);
      await TrackPlayer.play();
      dispatch(updateOnGoingAudio(item));
      return dispatch(updateOnGoingList(data));
    }
    if (playbackState === State.Playing && onGoingAudio?.id === item.id) {
      return await TrackPlayer.pause();
    }
    if (playbackState === State.Paused && onGoingAudio?.id === item.id) {
      return await TrackPlayer.play();
    }
    if (onGoingAudio?.id !== item.id) {
      const fromSameList = deepEqual(data, onGoingList);

      await TrackPlayer.pause();
      const index = data.findIndex(audio => audio.id === item.id);

      if (fromSameList) {
        await TrackPlayer.reset();
        await updateQueue(data);
        dispatch(updateOnGoingAudio(item));
      }
      await TrackPlayer.skip(index);
      await TrackPlayer.play();
      dispatch(updateOnGoingAudio(item));
    }
  };

  const togglePlayPause = async () => {
    if (isPlaying) {
      return await TrackPlayer.pause();
    }
    if (isPaused) {
      return await TrackPlayer.play();
    }
  };
  const seekTo = async (time: number) => {
    await TrackPlayer.seekTo(time);
  };
  const skipTo = async (time: number) => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + time);
  };

  const onNextPress = async () => {
    const currentList = await TrackPlayer.getQueue();
    const currentIndex = await TrackPlayer.getCurrentTrack();
    if (currentIndex === null) return;

    const nextIndex = currentIndex + 1;

    const nextAudio = currentList[nextIndex];
    if (nextAudio) {
      await TrackPlayer.skipToNext();
      dispatch(updateOnGoingAudio(onGoingList[nextIndex]));
    }
  };

  const onPreviousPress = async () => {
    const currentList = await TrackPlayer.getQueue();
    const currentIndex = await TrackPlayer.getCurrentTrack();
    if (currentIndex === null) return;

    const preIndex = currentIndex - 1;

    const nextAudio = currentList[preIndex];
    if (nextAudio) {
      await TrackPlayer.skipToPrevious();
      dispatch(updateOnGoingAudio(onGoingList[preIndex]));
    }
  };

  const setPlaybackRate = async (rate: number) => {
    await TrackPlayer.setRate(rate);
  };

  useEffect(() => {
    const setupPlayer = async () => {
      if (isReady) return;

      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
    };

    setupPlayer();
    isReady = true;
  }, []);

  return {
    onAudioPress,
    isPlayerReady,
    isPlaying,
    togglePlayPause,
    isBusy,
    seekTo,
    skipTo,
    onNextPress,
    setPlaybackRate,
    onPreviousPress,
  };
};

export default useAudioController;
