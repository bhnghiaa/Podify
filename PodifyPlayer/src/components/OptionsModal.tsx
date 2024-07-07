import BasicModalContainer from '@ui/BasicModalContainer';
import {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props<T> {
  visible?: boolean;
  onRequestClose?(): void;
  renderItem(item: T): JSX.Element;
  options: T[];
}
const OptionsModal = <T extends any>({
  visible,
  onRequestClose,
  renderItem,
  options,
}: Props<T>) => {
  return (
    <BasicModalContainer visible={visible} onRequestClose={onRequestClose}>
      {options.map((option, index) => {
        return <View key={index}>{renderItem(option)}</View>;
      })}
    </BasicModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OptionsModal;
