import PlaylistForm, {PlaylistInfo} from '@components/form/PlaylistForm';
import LatestUploads from '@components/LatestUploads';
import OptionsModal from '@components/OptionsModal';
import PlaylistModal from '@components/PlaylistModal';
import RecommendedAudios from '@components/RecommendedAudios';
import {getFromAsyncStorage, Keys} from '@utils/asyncStorage';
import colors from '@utils/colors';
import {FC, useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Text, Pressable} from 'react-native';
import TrackPlayer, {Track} from 'react-native-track-player';
import MaterialcomIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {AudioData, Playlist} from 'src/@types/audio';
import catchAsyncError from 'src/api/catchError';
import {getClient} from 'src/api/client';
import {useFetchPlaylist} from 'src/hooks/query';
import {upldateNotification} from 'src/store/notification';
import useAudioController from 'src/hooks/useAudioController';

interface Props {}

const Home: FC<Props> = props => {
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<AudioData>();
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);

  const dispatch = useDispatch();
  const {data = [], isLoading} = useFetchPlaylist();
  const {onAudioPress} = useAudioController();

  const handleOnLongPress = (item: AudioData) => {
    setSelectedAudio(item);
    setShowOptionsModal(true);
  };
  const handleAddToPlaylist = () => {
    setShowOptionsModal(false);
    setShowPlaylistModal(true);
  };
  const handleOnFavoritePress = async () => {
    if (!selectedAudio) return;
    try {
      const client = await getClient();
      const {data} = await client.post('/favorite?audioId=' + selectedAudio.id);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(upldateNotification({message: errorMessage, type: 'error'}));
    }
    dispatch(
      upldateNotification({
        message: "Added to favorite's list",
        type: 'success',
      }),
    );
    console.log('Add to favorite', selectedAudio);
    setSelectedAudio(undefined);
    setShowOptionsModal(false);
  };

  const handlePlaylistSubmit = async (playlistInfo: PlaylistInfo) => {
    try {
      const client = await getClient();
      if (!playlistInfo.title)
        return dispatch(
          upldateNotification({message: 'Title is required', type: 'error'}),
        );

      const {data} = await client.post('/playlist/create', {
        resId: selectedAudio?.id,
        title: playlistInfo.title,
        visibility: playlistInfo.private ? 'private' : 'public',
      });

      dispatch(
        upldateNotification({message: 'Playlist created', type: 'success'}),
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(upldateNotification({message: errorMessage, type: 'error'}));
    }
  };
  const handleUpdatePlaylist = async (item: Playlist) => {
    try {
      const client = await getClient();
      const {data} = await client.patch('/playlist/update-playlist', {
        id: item.id,
        item: selectedAudio?.id,
        title: item.title,
        visibility: item.visibility,
      });
      setSelectedAudio(undefined);
      setShowPlaylistModal(false);
      dispatch(
        upldateNotification({message: 'Added to playlist', type: 'success'}),
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(upldateNotification({message: errorMessage, type: 'error'}));
    }
  };
  useEffect(() => {
    const setupPlayer = async () => {
      try {
        await TrackPlayer.setupPlayer();
      } catch (error) {}
    };

    setupPlayer();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <LatestUploads
        onAudioPress={onAudioPress}
        onAudioLongPress={item => {
          handleOnLongPress(item);
        }}
      />
      <RecommendedAudios
        onAudioPress={onAudioPress}
        onAudioLongPress={item => {
          handleOnLongPress(item);
        }}
      />
      <OptionsModal
        visible={showOptionsModal}
        onRequestClose={() => setShowOptionsModal(false)}
        options={[
          {
            title: 'Add to playlist',
            icon: 'playlist-music',
            onPress: handleAddToPlaylist,
          },
          {
            title: 'Add to favorite',
            icon: 'cards-heart',
            onPress: handleOnFavoritePress,
          },
        ]}
        renderItem={item => (
          <Pressable style={styles.optionContainer} onPress={item.onPress}>
            <MaterialcomIcon
              name={item.icon}
              size={24}
              color={colors.PRIMARY}
            />
            <Text style={styles.optionLabel}>{item.title}</Text>
          </Pressable>
        )}
      />

      <PlaylistModal
        visible={showPlaylistModal}
        onRequestClose={() => setShowPlaylistModal(false)}
        onCreateNewPress={() => {
          setShowPlaylistForm(true);
          setShowPlaylistModal(false);
        }}
        onPlaylistPress={handleUpdatePlaylist}
        list={data || []}
      />
      <PlaylistForm
        visible={showPlaylistForm}
        onRequestClose={() => {
          setShowPlaylistForm(false);
          setShowPlaylistModal(false);
        }}
        onSubmit={handlePlaylistSubmit}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionLabel: {
    fontSize: 16,
    color: colors.PRIMARY,
    marginLeft: 5,
  },
});

export default Home;
