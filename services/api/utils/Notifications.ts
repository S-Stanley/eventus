import Helpers from "../database/helpers/Helpers";
import axios from "axios";
import InterfaceUsers from "../Interfaces/User";

const send_notification_to_all_users = async(): Promise<void> => {
    let page = 0;
    let users: InterfaceUsers[];
    const limit = 5;
    do {
        users = await Helpers.Users.get_all_users(page, limit);
        for (const i in users){
            if (users[i]?.player_id){
                send_notification_by_player_id(users[i].player_id, "You have been invited to an event!");
            }
        }
        page++;
    } while (users.length == limit);
}

const send_notification_by_player_id = async(player_id: string, content: string): Promise<boolean> => {
    try {
        await axios.post('https://onesignal.com/api/v1/notifications', {
            app_id: process.env.ONE_SIGNAL_APP_ID,
            include_player_ids: [player_id],
            contents: {
                en: content
            }
        });
        return (true);
    } catch (e) {
        console.error(e?.response?.data ?? e);
        return (false);
    }
}

export default {
    send_notification_to_all_users,
    send_notification_by_player_id,
}