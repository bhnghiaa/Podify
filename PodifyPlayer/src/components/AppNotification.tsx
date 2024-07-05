import colors from '@utils/colors';
import {FC, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {
  getNotificationState,
  upldateNotification,
} from 'src/store/notification';

interface Props {}

const AppNotification: FC<Props> = props => {
  const {message, type} = useSelector(getNotificationState);
  const height = useSharedValue(0);

  const dispatch = useDispatch();

  const heightStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  let backgroundColor = colors.ERROR;
  let textColor = colors.CONTRAST;

  switch (type) {
    case 'success':
      backgroundColor = colors.SUCCESS;
      textColor = colors.PRIMARY;
      break;
  }

  useEffect(() => {
    let timeoutId = 0;
    const performAnimation = () => {
      height.value = withTiming(45, {
        duration: 150,
      });

      timeoutId = setTimeout(() => {
        height.value = withTiming(0, {
          duration: 150,
        });

        dispatch(upldateNotification({message: '', type}));
      }, 3000);
    };

    if (message) performAnimation();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message]);

  return (
    <Animated.View style={[styles.container, {backgroundColor}, heightStyle]}>
      <Text style={[styles.message, {color: textColor}]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    alignItems: 'center',
  },
});

export default AppNotification;
