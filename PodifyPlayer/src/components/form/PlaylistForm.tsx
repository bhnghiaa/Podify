import BasicModalContainer from '@ui/BasicModalContainer';
import colors from '@utils/colors';
import {FC, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  visible?: boolean;
  onRequestClose?(): void;
  onSubmit(info: PlaylistInfo): void;
}
export interface PlaylistInfo {
  title: string;
  private: boolean;
}

const PlaylistForm: FC<Props> = ({visible, onRequestClose, onSubmit}) => {
  const [playlistInfo, setPlaylistInfo] = useState({title: '', private: false});
  const handleSubmit = () => {
    onSubmit(playlistInfo);
    handleClose();
  };
  const handleClose = () => {
    setPlaylistInfo({title: '', private: false});
    onRequestClose && onRequestClose();
  };
  return (
    <BasicModalContainer visible={visible} onRequestClose={handleClose}>
      <Text style={styles.title}>Create New Playlist</Text>
      <View>
        <TextInput
          placeholder="Title"
          style={styles.input}
          onChangeText={text => {
            setPlaylistInfo({...playlistInfo, title: text});
          }}
          value={playlistInfo.title}
        />
      </View>
      <Pressable
        style={styles.privateSelector}
        onPress={() => {
          setPlaylistInfo({...playlistInfo, private: !playlistInfo.private});
        }}>
        {playlistInfo.private ? (
          <MaterialComIcon
            name="radiobox-marked"
            color={colors.SECONDARY}
            size={16}
          />
        ) : (
          <MaterialComIcon
            name="radiobox-blank"
            color={colors.SECONDARY}
            size={16}
          />
        )}
        <Text style={styles.privateLabel}>Private</Text>
      </Pressable>
      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Create</Text>
      </Pressable>
    </BasicModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    height: 45,
    color: colors.PRIMARY,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    color: colors.PRIMARY,
    fontWeight: '700',
  },
  submitButton: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    borderColor: colors.PRIMARY,
    borderWidth: 0.5,
  },
  submitText: {
    color: colors.PRIMARY,
    fontWeight: 'bold',
    fontSize: 14,
  },
  privateSelector: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  privateLabel: {
    color: colors.PRIMARY,
    fontSize: 16,
  },
});

export default PlaylistForm;
