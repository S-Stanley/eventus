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

1 - Make sure to have a keystore realease key
2 - Check your `services/mobile/android/gradle.properties`, you need to have somes variables set: `MYAPP_UPLOAD_STORE_FILE`, `MYAPP_UPLOAD_KEY_ALIAS`, `MYAPP_UPLOAD_STORE_PASSWORD` and `MYAPP_UPLOAD_KEY_PASSWORD`
3 - You need to change the properties `versionCode` and `versionName` in `services/mobile/android/app/build.gradle`
4 - Run this command to create a new release
```bash
cd services/mobile/android && bash ./gradlew bundleRelease && cd -
```
5 - The build will be located at `services/mobile/android/app/build/outputs/bundle/release/app-release.aab`. You can see it with:
```bash
open services/mobile/android/app/build/outputs/bundle/release/
```