import colors from '@utils/colors';
import {FC} from 'react';
import Icon from 'react-native-vector-icons/Entypo';

interface Props {
  privateIcon: boolean;
}

const PasswordVisibilityIcon: FC<Props> = ({privateIcon}) => {
  return privateIcon ? (
    <Icon name="eye" color={colors.SECONDARY} size={16} />
  ) : (
    <Icon name="eye-with-line" color={colors.SECONDARY} size={16} />
  );
};

export default PasswordVisibilityIcon;
