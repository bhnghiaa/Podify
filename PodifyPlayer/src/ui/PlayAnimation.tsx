import colors from '@utils/colors';
import {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import AnimatedStroke from './AnimatedStroke';

interface Props {
  visible: boolean;
}

const PlayAnimation: FC<Props> = ({visible}) => {
  if (!visible) return null;
  return (
    <View style={styles.container}>
      <View style={styles.strokeContainer}>
        <AnimatedStroke height={15} delay={0} />
        <AnimatedStroke height={20} delay={100} />
        <AnimatedStroke height={15} delay={150} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.OVERLAY,
  },
  strokeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 20,
  },
});

export default PlayAnimation;
