export {};
const mongoose = require('mongoose');

import UsersFixture from './Users';

mongoose.connect('mongodb://127.0.0.1:27017/').then(async() => {
    await UsersFixture.setup_user_fixture();
    mongoose.connection.close();
});