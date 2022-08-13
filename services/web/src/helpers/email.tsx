import axios from 'axios';
import config from '../config/config';

const send_to_adm = async(from: string, message: string): Promise<boolean> => {
    try {
        await axios.post(`${config.Api.url}/adm/email`, {
            from: from,
            message: message,
        });
        return (true);
    } catch (e) {
        alert("There was an error, please try again later");
        return (false);
    }
}

export default {
    send_to_adm,
}