#!/bin/bash

cd services/app/ || echo 'Error while trying to move to ios service folder';
ENVFILE=.env.prod npx react-native run-ios
cd -  || echo 'Fail to go back to preinstall pwd';