export const GoogleSignin = {
  configure: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
  isSignedIn: jest.fn(() => Promise.resolve(false)),
  getCurrentUser: jest.fn(() => Promise.resolve(null)),
};
export const statusCodes = {
  SIGN_IN_CANCELLED: '12501',
  IN_PROGRESS: '12502',
  PLAY_SERVICES_NOT_AVAILABLE: '12503',
};
