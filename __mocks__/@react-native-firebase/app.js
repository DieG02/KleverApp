export default {
  app: jest.fn(() => ({
    name: '[DEFAULT]',
    options: {},
  })),
  apps: [],
  initializeApp: jest.fn(),
};
