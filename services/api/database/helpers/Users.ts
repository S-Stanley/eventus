import Schema from "../schema/Schema";
import InterfaceUsers from "../../Interfaces/User";
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const create_users = async(email: string, password: string, name: string, firstname: string, location: string, apple_user_id: string = ''): Promise<InterfaceUsers | boolean> => {
    try {
        const hash = await bcrypt.hashSync(password, saltRounds);
        const create = await new Schema.Users({
            email: email,
            password: hash,
            name: name,
            firstname: firstname,
            location: location,
            apple_user_id: apple_user_id,
            created_at: Date.now(),
            role: 'user',
        }).save();
        if (!create) {
            throw new Error('Cannot create users');
        }
        create.password = undefined;
        return (create);
    } catch (e) {
        console.log(e);
        return (false);
    }
}

const check_password = async (password: string, real_password: string) => {
    return (await bcrypt.compareSync(password, real_password));
}

const find_user_by_email = async(email: string): Promise<InterfaceUsers> => {
    const user_to_find = await Schema.Users.findOne({
        email: email,
    });
    return (user_to_find);
}

const add_player_id = async(email: string, player_id: string): Promise<boolean> => {
    const usr = await find_user_by_email(email);
    if (!usr){
        return (false);
    }
    const updated_user: InterfaceUsers = await Schema.Users.findOneAndUpdate({
        email: email,
    }, {
        player_id: player_id
    }, {
        new: true,
    });
    if (updated_user.player_id != player_id){
        return (false);
    }
    return (true);
}

const add_player_id_with_apple = async(apple_user_id: string, player_id: string): Promise<boolean> => {
    const usr = await find_user_by_apple_user_id(apple_user_id);
    if (!usr){
        return (false);
    }
    const updated_user: InterfaceUsers = await Schema.Users.findOneAndUpdate({
        apple_user_id: apple_user_id,
    }, {
        player_id: player_id
    }, {
        new: true,
    });
    if (updated_user.player_id != player_id){
        return (false);
    }
    return (true);
}

const find_user_by_id = async(user_id: string): Promise<InterfaceUsers> => {
    const user_to_find = await Schema.Users.findOne({
        user_id: user_id,
    });
    return (user_to_find);
}

const get_all_users = async(page: number = 0, limit: number = 5): Promise<InterfaceUsers[]> => {
    const all_users = Schema.Users.find().skip(page * limit).limit(limit);
    return (all_users);
}

const find_user_by_apple_user_id = async(apple_user_id: string): Promise<InterfaceUsers> => {
    const user_to_find = await Schema.Users.findOne({
        apple_user_id: apple_user_id,
    });
    return (user_to_find);
}

const update_role_user = async(user_id: string, role: string): Promise<InterfaceUsers> => {
    const user_to_update = await Schema.Users.findOneAndUpdate({
        _id: user_id,
    }, {
        role: role,
    }, {
        new: true,
    });
    return (user_to_update);
}

export default {
    create_users,
    find_user_by_email,
    add_player_id,
    find_user_by_id,
    check_password,
    get_all_users,
    find_user_by_apple_user_id,
    add_player_id_with_apple,
    update_role_user,
}