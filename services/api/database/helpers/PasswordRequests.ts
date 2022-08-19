import Schema from '../schema/Schema';

import InterfacePasswordRequest from '../../Interfaces/PasswordRequest';

const bcrypt = require('bcryptjs');
const saltRounds = 10;

function random_choice(data) {
    return data[Math.floor(Math.random() * data.length)];
}

function generate_code(size: number = 6): string {
    let code: string = '';
    for (const i in [...Array(size).keys()]){
        code = code + random_choice([...Array(size).keys()]);
    }
    return (code);
}

async function get_password_request_by_user_id(user_id: string): Promise<InterfacePasswordRequest> {
    const req = await Schema.PasswordRequest.findOne({
        user_id: user_id,
        state: 'PENDING'
    });
    return (req);
}

async function get_password_request_by_request_id(request_id: string): Promise<InterfacePasswordRequest> {
    const req = await Schema.PasswordRequest.findOne({
        _id: request_id,
    });
    return (req);
}

async function create_password_request(password: string, user_id: string): Promise<InterfacePasswordRequest> {
    const last_pending_request = await get_password_request_by_user_id(user_id);
    if (last_pending_request) {
        set_password_request_as_canceled(last_pending_request?._id);
    }
    const code = await generate_code();
    const hash = await bcrypt.hashSync(password, saltRounds);
    const password_request_created = await new Schema.PasswordRequest({
        user_id: user_id,
        code: code,
        state: 'PENDING',
        password: hash,
        created_at: new Date(),
    }).save();
    return (password_request_created);
}

async function set_password_request_as_validated(request_id: string, code: string): Promise<void> {
    const password_request_document = await get_password_request_by_request_id(request_id);
    if (!password_request_document){
        throw new Error("Cannot find this password request");
    }
    if (code !== password_request_document.code){
        throw new Error("Wrong verification code, please try again");
    }
    const update_user_password: { nModified?: number } = await Schema.Users.updateOne({
        _id: password_request_document.user_id,
    }, {
        password: password_request_document.password,
    });
    if (update_user_password?.nModified) {
        throw new Error("Error while trying to update your password");
    }
}

async function set_password_request_as_canceled(request_id: string): Promise<boolean> {
    const updated_password_request: { nModified?: number } = await Schema.PasswordRequest.updateOne({
        _id: request_id,
    }, {
        state: 'CANCELED',
    });
    if (updated_password_request?.nModified == 0) {
        return (false);
    }
    return (true);
}

export default {
    get_password_request_by_user_id,
    create_password_request,
    set_password_request_as_validated,
    set_password_request_as_canceled,
    get_password_request_by_request_id,
}