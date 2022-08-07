#!/bin/bash

# delete old bundle
rm -rf services/mobile/android/app/src/main/assets/index.android.bundle

# generate new bundle
cd services/mobile || exit 1
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
cd - || exit 1

# delete duplicate assets
rm -rf services/mobile/android/app/src/main/res/drawable-*

# generate new bundle
cd services/mobile || exit 1
npx react-native run-android --variant=release
cd - || exit 1