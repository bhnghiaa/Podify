import colors from '@utils/colors';
import {FC} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  color?: string;
  playing?: boolean;
  onPress?(): void;
}

const PlayPauseBtn: FC<Props> = ({
  color = colors.CONTRAST,
  playing,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      {playing ? (
        <AntDesign name="pause" size={24} color={color} />
      ) : (
        <AntDesign name="caretright" size={24} color={color} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PlayPauseBtn;
