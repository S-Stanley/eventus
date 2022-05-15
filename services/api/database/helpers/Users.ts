import Schema from "../schema/Schema";
import InterfaceUsers from "../../Interfaces/User";
const bcrypt = require('bcrypt');
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

export default {
    create_users,
}