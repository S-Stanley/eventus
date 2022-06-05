import axios from 'axios';
import Config from '../Config/Config';

const authentificate_users_with_gmail = async(email: string, firstname: string, name: string): Promise<boolean>=> {
    try {
        const req = await axios.post(`${Config.Api.url}/users/auth/gmail`, {
            email: email,
            firstname: firstname,
            name: name,
        });
        console.log(req.data);
        return (true);
    } catch (e) {
        console.error(e);
        alert(e);
        return (false);
    }
}

export default {
    authentificate_users_with_gmail,
}