import {FC, ReactNode} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AppNotification from './AppNotification';

interface Props {
  children: ReactNode;
}

const AppCotnainer: FC<Props> = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <AppNotification />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default AppCotnainer;
