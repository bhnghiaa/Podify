import {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {}
const PlaylistTab: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <Text>PlaylistTab</Text>
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

export default PlaylistTab;
