#!/bin/bash

cd services/mobile/ || echo 'Error while trying to move to ios service folder';
npx react-native run-android
cd -  || echo 'Fail to go back to preinstall pwd';