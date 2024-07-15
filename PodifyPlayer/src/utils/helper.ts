import {PermissionsAndroid, Platform} from 'react-native';

export const getPermissionToReadImages = async () => {
  if (Platform.OS === 'android')
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
};
