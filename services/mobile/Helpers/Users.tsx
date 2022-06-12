import axios from 'axios';
import Config from '../Config/Config';
import Users from '../interfaces/Users';

const authentificate_users_with_gmail = async(email: string, firstname: string, name: string): Promise<Users | boolean>=> {
    try {
        const req = await axios.post(`${Config.Api.url}/users/auth/gmail`, {
            email: email,
            firstname: firstname,
            name: name,
        });
        return (req.data);
    } catch (e) {
        console.error(e);
        alert(e);
        return (false);
    }
}

const add_player_id = async (email: string, player_id: string): Promise<boolean> => {
    try {
        await axios.post(`${Config.Api.url}/users/notifications/player_id`, {
            email: email,
            player_id: player_id,
        });
        return (true);
    } catch (e) {
        console.error(e);
        return (false);
    }
}

export default {
    authentificate_users_with_gmail,
    add_player_id,
}