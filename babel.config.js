const env = process.env.NODE_ENV || 'development';

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: `.env.${env}`,
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
