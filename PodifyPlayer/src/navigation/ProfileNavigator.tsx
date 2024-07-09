import {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileNavigatorStackParamList} from 'src/@types/navigation';
import Profile from '@views/Profile';
import ProfileSettings from '@components/profile/ProfileSettings';

interface Props {}

const Stack = createNativeStackNavigator<ProfileNavigatorStackParamList>();

const ProfileNavigator: FC<Props> = props => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
