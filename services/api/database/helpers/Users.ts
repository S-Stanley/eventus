import Schema from "../schema/Schema";
import InterfaceUsers from "../../Interfaces/User";
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const create_users = async(email: string, password: string, name: string, firstname: string, location: string): Promise<InterfaceUsers | boolean> => {
    try {
        const hash = await bcrypt.hashSync(password, saltRounds);
        const create = await new Schema.Users({
            email: email,
            password: hash,
            name: name,
            firstname: firstname,
            location: location,
            created_at: Date.now(),
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

export default {
    create_users,
    find_user_by_email,
    add_player_id,
}