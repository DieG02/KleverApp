import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  scopes: [
    // 'https://www.googleapis.com/auth/user.birthday.read',
    // 'https://www.googleapis.com/auth/user.gender.read',
    // 'https://www.googleapis.com/auth/user.addresses.read',
  ],
  webClientId: process.env.WEB_CLIENT_ID,
  offlineAccess: true,
});

export default GoogleSignin;
