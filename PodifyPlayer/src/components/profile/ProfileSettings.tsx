import AppHeader from '@components/AppHeader';
import AvatarField from '@ui/AvatarField';
import colors from '@utils/colors';
import {FC, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Pressable, TextInput} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppButton from '@ui/AppButton';
import {getClient} from 'src/api/client';
import catchAsyncError from 'src/api/catchError';
import {upldateNotification} from 'src/store/notification';
import {
  updateProfile,
  updateLoggedInState,
  updateBusyState,
  getAuthState,
} from 'src/store/auth';
import {useDispatch, useSelector} from 'react-redux';
import {Keys, removeFromAsyncStorage} from '@utils/asyncStorage';
import deepEqual from 'deep-equal';

interface Props {}
interface ProfileInfo {
  name: string;
  avatar?: string;
}

const ProfileSettings: FC<Props> = props => {
  const [userInfo, setUserInfo] = useState<ProfileInfo>({name: ''});
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();
  const {profile} = useSelector(getAuthState);

  const isSame = deepEqual(userInfo, {
    name: profile?.name,
    avatar: profile?.avatar,
  });

  const handleLogout = async (fromAll?: boolean) => {
    dispatch(updateBusyState(true));
    try {
      const endpoint = '/auth/log-out?fromAll=' + (fromAll ? 'yes' : '');
      const client = await getClient();
      await client.post(endpoint);
      await removeFromAsyncStorage(Keys.AUTH_TOKEN);
      dispatch(updateProfile(null));
      dispatch(updateLoggedInState(false));
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(upldateNotification({message: errorMessage, type: 'error'}));
    }
    dispatch(updateBusyState(false));
  };

  const handleSubmit = async () => {
    setBusy(true);
    try {
      if (!userInfo.name.trim())
        return dispatch(
          upldateNotification({
            message: 'Profile name is require!',
            type: 'error',
          }),
        );
      const formData = new FormData();
      formData.append('name', userInfo.name);
      const client = await getClient({'Content-Type': 'multipart/form-data;'});
      const {data} = await client.post('/auth/update-profile', formData);
      dispatch(updateProfile(data.profile));
      dispatch(
        upldateNotification({
          message: 'Your profile is updated.',
          type: 'success',
        }),
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(upldateNotification({message: errorMessage, type: 'error'}));
    }
    setBusy(false);
  };

  useEffect(() => {
    if (profile) setUserInfo({name: profile.name, avatar: profile.avatar});
  }, [profile]);

  return (
    <View style={styles.container}>
      <AppHeader title="Settings" />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile Settings</Text>
      </View>

      <View style={styles.settingOptionsContainer}>
        <View style={styles.avatarContainer}>
          <AvatarField source={userInfo.avatar} />
          <Pressable style={styles.paddingLeft}>
            <Text style={styles.linkText}>Update Profile Image</Text>
          </Pressable>
        </View>
        <TextInput
          onChangeText={text => setUserInfo({...userInfo, name: text})}
          style={styles.nameInput}
          value={userInfo.name}
        />
        {/* <View style={styles.emailConainer}>
          <Text style={styles.email}>{profile?.email}</Text>
          <MaterialIcon name="verified" size={15} color={colors.SECONDARY} />
        </View> */}
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Logout</Text>
      </View>

      <View style={styles.settingOptionsContainer}>
        <Pressable onPress={() => handleLogout(true)} style={styles.logoutBtn}>
          <AntDesign name="logout" size={20} color={colors.CONTRAST} />
          <Text style={styles.logoutBtnTitle}>Logout From All</Text>
        </Pressable>
        <Pressable onPress={() => handleLogout()} style={styles.logoutBtn}>
          <AntDesign name="logout" size={20} color={colors.CONTRAST} />
          <Text style={styles.logoutBtnTitle}>Logout</Text>
        </Pressable>
      </View>

      {!isSame ? (
        <View style={styles.marginTop}>
          <AppButton
            onPress={handleSubmit}
            title="Update"
            borderRadius={7}
            busy={busy}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titleContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.SECONDARY,
    paddingBottom: 5,
    marginTop: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.SECONDARY,
  },
  settingOptionsContainer: {
    marginTop: 15,
    paddingLeft: 15,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    color: colors.SECONDARY,
    fontStyle: 'italic',
  },
  paddingLeft: {
    paddingLeft: 15,
  },
  nameInput: {
    color: colors.CONTRAST,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.CONTRAST,
    borderRadius: 7,
    marginTop: 15,
  },
  emailConainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  email: {
    color: colors.CONTRAST,
    marginRight: 10,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  logoutBtnTitle: {
    color: colors.CONTRAST,
    fontSize: 18,
    marginLeft: 5,
  },
  marginTop: {
    marginTop: 15,
  },
});

export default ProfileSettings;
