export {};
require('dotenv').config();

import Helpers from "../helpers/Helpers";

const setup_user_fixture = async(): Promise<void> => {
    await Helpers.Users.delete_all_users();

    await Helpers.Users.create_users(
        '1',
        'user0',
        'password',
        'name-user0',
        'firstname-user0',
        'Toronto',
        '',
    );
}

export default {
    setup_user_fixture,
}