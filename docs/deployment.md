# Deployement

React native documentation for [ios deployment](https://reactnative.dev/docs/publishing-to-app-store) and [android deployment.](https://reactnative.dev/docs/signed-apk-android)

## iOS

1 - Open xcworkspace file

```bash
open services/mobile/ios
```

2 - Select `Any iOS device` as a device
3 - Change the version and build number on Xcode
4 - Click on `Product` menu then `Archive`
5 - Press `next` until uploading is done

## Android

1. Make sure to have a keystore realease key
2. Check your `services/mobile/android/gradle.properties`, you need to have somes variables set: `MYAPP_UPLOAD_STORE_FILE`, `MYAPP_UPLOAD_KEY_ALIAS`, `MYAPP_UPLOAD_STORE_PASSWORD` and `MYAPP_UPLOAD_KEY_PASSWORD`
3. You need to change the properties `versionCode` and `versionName` in `services/mobile/android/app/build.gradle`
4. Run this command to create a new release `cd services/mobile/android && bash ./gradlew bundleRelease && cd -`
5. The build will be located at `services/mobile/android/app/build/outputs/bundle/release/app-release.aab`. You can see it with: `open services/mobile/android/app/build/outputs/bundle/release/`

## Troubleshooting

### App variant release is not updated to the last version

1. Delete files in `eventus/services/mobile/android/app/src/main/assets`
1. Run `./gradlew clean` in `services/mobile/android`
1. Run `npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res` in root folder ~/eventus
1. Delete new files created in `services/mobile/android/app/src/main/res`

Part of the answer is [on this post from stackoverflow](https://stackoverflow.com/questions/53220590/react-native-run-android-builds-the-correct-version-of-my-app-but-assemblerelea).

Or simply run:

```bash
bash scripts/run-variant-release-android.sh
```