import colors from '@utils/colors';
import {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import PulseAnimationContainer from './PulseAnimationContainer';

interface Props {
  items?: number;
}

const AudioListLoadingUI: FC<Props> = ({items = 8}) => {
  const dummyData = new Array(items).fill('');

  return (
    <PulseAnimationContainer>
      <View>
        {dummyData.map((_, index) => {
          return <View key={index} style={styles.dummyListItem} />;
        })}
      </View>
    </PulseAnimationContainer>
  );
};

const styles = StyleSheet.create({
  dummyListItem: {
    height: 50,
    width: '100%',
    backgroundColor: colors.INACTIVE_CONTRAST,
    borderRadius: 5,
    marginBottom: 15,
  },
});

export default AudioListLoadingUI;
