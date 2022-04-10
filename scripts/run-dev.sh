#!/bin/bash

docker-compose up --build -d

cd services/mobile/ || echo 'Error while trying to move to ios service folder';
npx react-native run-ios
cd -  || echo 'Fail to go back to preinstall pwd';