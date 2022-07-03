import Invitations from '../interfaces/Invitations';
import Config from '../Config/Config';
import axios from 'axios';

const find_invitation_by_event_id_and_user_id = async(event_id: string, user_id: string): Promise<Invitations | boolean> => {
    try {
        const req = await axios.get(`${Config.Api.url}/invitations/${event_id}/${user_id}`);
        return (req.data);
    } catch (e){
        console.error(JSON.stringify(e));
        // alert(JSON.stringify(e.response.data));
        // alert('There was an error from our side, please try again later');
        return (false);
    }
}

const update_invitations = async(event_id: string, user_id: string, state: string): Promise<Invitations | boolean> => {
    try {
        const req = await axios.post(`${Config.Api.url}/invitations`, {
            event_id: event_id,
            user_id: user_id,
            state: state,
        });
        return (req.data);
    } catch (e){
        console.error(JSON.stringify(e));
        alert(JSON.stringify(e.response.data));
        alert('There was an error from our side, please try again later');
        return (false);
    }
}

export default {
    find_invitation_by_event_id_and_user_id,
    update_invitations,
}