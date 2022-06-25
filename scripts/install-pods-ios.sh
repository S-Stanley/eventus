#!/bin/bash

cd services/mobile/ios || echo 'Error while trying to move to ios service folder';
pod install
cd -  || echo 'Fail to go back to preinstall pwd';