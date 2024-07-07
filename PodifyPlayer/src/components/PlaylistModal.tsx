import BasicModalContainer from '@ui/BasicModalContainer';
import colors from '@utils/colors';
import {FC, ReactNode} from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Playlist} from 'src/@types/audio';
import PlaylistForm from './form/PlaylistForm';

interface Props {
  visible?: boolean;
  onRequestClose?(): void;
  list: Playlist[];
  onCreateNewPress?(): void;
  onPlaylistPress(item: Playlist): void;
}

interface ListItemProps {
  icon: ReactNode;
  title: string;
  onPress?(): void;
}

const ListItem: FC<ListItemProps> = ({icon, title, onPress}) => {
  return (
    <Pressable style={styles.listItemContainer} onPress={onPress}>
      {icon}
      <Text style={styles.listItemTitle}>{title}</Text>
    </Pressable>
  );
};

const PlaylistModal: FC<Props> = ({
  visible,
  onRequestClose,
  list,
  onCreateNewPress,
  onPlaylistPress,
}) => {
  return (
    <BasicModalContainer visible={visible} onRequestClose={onRequestClose}>
      <ScrollView>
        {list.map(item => (
          <ListItem
            key={item.id}
            icon={
              <FontAwesome
                name={item.visibility === 'public' ? 'globe' : 'lock'}
                size={20}
                color={colors.PRIMARY}
              />
            }
            title={item.title}
            onPress={() => onPlaylistPress(item)}
          />
        ))}
      </ScrollView>
      <ListItem
        onPress={onCreateNewPress}
        icon={<AntDesign name="plus" size={20} color={colors.PRIMARY} />}
        title="Create New"
      />
    </BasicModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
  },
  listItemTitle: {
    color: colors.PRIMARY,
    fontSize: 16,
    marginLeft: 5,
  },
});

export default PlaylistModal;
