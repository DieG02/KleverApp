# KleverApp

A small React Native app updated after 2 years with language support and Android flavor setup.

> **Note**: This project uses `react-native-dotenv` and Android product flavors. Make sure you have completed the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) before continuing.

## Install dependencies

From the repo root:

```sh
npm install
```

Then install functions dependencies:

```shn
cd functions && npm install
```

## Required local files

This repo uses environment-specific config files.

Create these files in the project root:

- `.env.development`
- `.env.production`

Use `env.example` as a template and do not commit real secret values.

### Example env file

```env
WEB_CLIENT_ID=YOUR_GOOGLE_WEB_CLIENT_ID
```

The app imports `WEB_CLIENT_ID` from `@env`, and `babel.config.js` loads the correct `.env.*` file based on `NODE_ENV`.

## Android flavors

Android is configured with two flavors:

- `dev` → `com.kleverapp.dev`
- `prod` → `com.kleverapp`

The flavor-specific Firebase config files must live in:

- `android/app/src/dev/google-services.json`
- `android/app/src/prod/google-services.json`

If you removed the original project and restored this one, make sure both flavor folders exist. The `dev` folder is already included, so add the `prod` folder and place the matching `google-services.json` there.

## Running the app

Start the Metro server first:

```sh
npm start
```

Run Android flavors:

```sh
npm run android:dev
npm run android:stage
npm run android:prod
```

Or use the script aliases that also set `NODE_ENV`:

```sh
npm run build:dev
npm run build:stage
npm run build:prod
```

Run iOS:

```sh
npm run ios
```

## Publish and signing notes

The repo is public, so keep sensitive files and keys out of version control.

- `android/app/src/*/google-services.json` is already ignored by `.gitignore`
- `.env.*` is also ignored by `.gitignore`
- `*.keystore` files are ignored by `.gitignore`
- `ios/*/GoogleService-Info.plist` is ignored as well

The `publish` command in `package.json` builds the `prodRelease` bundle.

If your production signing key is already configured in `android/gradle.properties`, that is fine for local builds, but avoid committing actual passwords and keystore files. Better options are:

- keep secrets in a local `~/.gradle/gradle.properties`
- use CI secret variables when building/publishing
- keep the repo clean and only commit non-secret configuration

## Quick troubleshooting

- If the build fails because `google-services.json` is missing, verify the files are in `android/app/src/dev/` and `android/app/src/prod/`.
- If env values are not loaded, confirm `.env.development` / `.env.production` exist and that `NODE_ENV` is set correctly.
- For CocoaPods issues on iOS, run:

```sh
bundle exec pod install
```

## Learn more

- [React Native Getting Started](https://reactnative.dev/docs/getting-started)
- [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment)
- [Fast Refresh](https://reactnative.dev/docs/fast-refresh)
