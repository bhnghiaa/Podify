import {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {}
const HistoryTab: FC<Props> = (props) => {
  return <View style={styles.container}><Text>HistoryTab</Text></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HistoryTab;