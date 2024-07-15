import {NavigationProp, useNavigation} from '@react-navigation/native';
import AppLink from '@ui/AppLink';
import colors from '@utils/colors';
import {FC, useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {ProfileNavigatorStackParamList} from 'src/@types/navigation';
import {getClient} from 'src/api/client';
import {getAuthState} from 'src/store/auth';

interface Props {
  time?: number;
  activeAtFirst?: boolean;
  linkTitle: string;
  userId?: string;
}

const ReVerificationLink: FC<Props> = ({
  linkTitle,
  userId,
  time = 60,
  activeAtFirst = false,
}) => {
  const [coundDown, setCoundDown] = useState(time);
  const [canSendNewOtpRequest, setCanSendNewOtpRequest] =
    useState(activeAtFirst);
  const {profile} = useSelector(getAuthState);
  const {navigate} =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>();

  const requestForOTP = async () => {
    setCoundDown(60);
    setCanSendNewOtpRequest(false);
    try {
      const client = await getClient();
      await client.post('/auth/re-verify-email', {
        userId: userId || profile?.id,
      });

      navigate('Verification', {
        userInfo: {
          email: profile?.email || '',
          name: profile?.name || '',
          id: userId || profile?.id || '',
        },
      });
    } catch (error) {
      console.log('Requesting for new otp: ', error);
    }
  };

  useEffect(() => {
    if (canSendNewOtpRequest) return;

    const intervalId = setInterval(() => {
      setCoundDown(oldCountDown => {
        if (oldCountDown <= 0) {
          setCanSendNewOtpRequest(true);
          clearInterval(intervalId);

          return 0;
        }
        return oldCountDown - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [canSendNewOtpRequest]);

  return (
    <View style={styles.container}>
      {coundDown > 0 && !canSendNewOtpRequest ? (
        <Text style={styles.countDown}>{coundDown} sec</Text>
      ) : null}
      <AppLink
        active={canSendNewOtpRequest}
        title={linkTitle}
        onPress={requestForOTP}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countDown: {
    color: colors.SECONDARY,
    marginRight: 7,
  },
});

export default ReVerificationLink;
