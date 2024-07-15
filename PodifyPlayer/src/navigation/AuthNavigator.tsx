import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LostPassword from '@views/auth/LostPassword';
import SignIn from '@views/auth/SignIn';
import SignUp from '@views/auth/SignUp';
import Verification from '@views/auth/Verification';
import {AuthStackParamList} from 'src/@types/navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="LostPassword" component={LostPassword} />
      <Stack.Screen name="Verification" component={Verification} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
