import axios from 'axios';
import Config from '../Config/Config';
import Hosts from '../interfaces/Hosts';

const get_host_by_id = async(host_id: string): Promise<Hosts | boolean> => {
    try {
        const req = await axios.get(`${Config.Api.url}/hosts/${host_id}`);
        return (req.data);
    } catch (e) {
        console.error(JSON.stringify(e));
        alert('There was an error from our side, please try again later');
        return (false);
    }
}

export default {
    get_host_by_id,
}