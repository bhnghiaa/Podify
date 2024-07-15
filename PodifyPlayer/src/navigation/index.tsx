import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import Loader from '@ui/Loader';
import {getFromAsyncStorage, Keys} from '@utils/asyncStorage';
import colors from '@utils/colors';
import {FC, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import client from 'src/api/client';
import {
  getAuthState,
  updateBusyState,
  updateLoggedInState,
  updateProfile,
} from 'src/store/auth';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

interface Props {}

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.PRIMARY,
    primary: colors.CONTRAST,
  },
};

const AppNavigator: FC<Props> = props => {
  const {loggedIn, busy} = useSelector(getAuthState);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuthInfo = async () => {
      dispatch(updateBusyState(true));
      try {
        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        if (!token) {
          return dispatch(updateBusyState(false));
        }

        const {data} = await client.get('/auth/is-auth', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        dispatch(updateProfile(data.profile));
        dispatch(updateLoggedInState(true));
      } catch (error) {
        console.log('Auth error: ', error);
      }

      dispatch(updateBusyState(false));
    };

    fetchAuthInfo();
  }, []);

  return (
    <NavigationContainer theme={AppTheme}>
      {busy ? (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: colors.OVERLAY,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}>
          <Loader />
        </View>
      ) : null}
      {loggedIn ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
