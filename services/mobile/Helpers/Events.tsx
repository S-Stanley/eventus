import axios from 'axios';
import Events from '../interfaces/Events';
import Config from '../Config/Config';

const get_all_events = async(): Promise<Events[]> => {
    try {
        const req = await axios.get(`${Config.Api.url}/events`);
        return (req.data);
    } catch (e) {
        console.error(JSON.stringify(e));
        alert(JSON.stringify(e.response.data));
        alert('There was an error from our side, please try again later');
        return ([]);
    }
}

export default {
    get_all_events,
}