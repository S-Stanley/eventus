#!/bin/bash

cd services/api/ || echo 'Error while trying to move to ios service folder';

npm run build

node build/database/fixtures/Activities.js
node build/database/fixtures/Hosts.js
node build/database/fixtures/Events.js

cd -  || echo 'Fail to go back to previous pwd';