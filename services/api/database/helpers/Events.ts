import EventInterface from "../../Interfaces/Events";
import Utils from "../../utils/Utils";
import Schema from "../schema/Schema";
const ObjectId = require('mongoose').Types.ObjectId;

const find_event_by_datetime_and_created_by = async (host_id: string, activity_id: string, date_event: string, time_event:string, created_by: string): Promise<EventInterface> => {
    const event_to_find = await Schema.Events.findOne({
        host_id: host_id,
        activity_id: activity_id,
        date_event: date_event,
        time_event: time_event,
        created_by: created_by,
    });
    return (event_to_find);
}

const create_event = async(
    host_id: string,
    activity_id: string,
    date_event: string,
    time_event: string,
    description: string,
    minimal_number_of_participants: string,
    maximal_number_of_participants: string,
    created_by: string,
): Promise<EventInterface | boolean> => {
    if (!ObjectId.isValid(host_id) || !ObjectId.isValid(activity_id)) {
        console.error('Invalid format id');
        return (false);
    }
    if (!Utils.Datetime.verif_format_date(date_event)) {
        console.error('Invalid format date');
        return (false);
    }
    if (!Utils.Datetime.verif_format_time(time_event)) {
        console.error('Invalid format time');
        return (false);
    }
    if (parseInt(minimal_number_of_participants) <= 0) {
        console.error('Invalid format minimal_number_of_participants');
        return (false);
    }
    if (parseInt(maximal_number_of_participants) <= 0) {
        console.error('Invalid format maximal_number_of_participants');
        return (false);
    }
    const event_created = await new Schema.Events({
        host_id: host_id,
        activity_id: activity_id,
        date_event: date_event,
        time_event: time_event,
        description: description,
        minimal_number_of_participants: minimal_number_of_participants,
        maximal_number_of_participants: maximal_number_of_participants,
        created_by: created_by,
        created_at: new Date(),
    }).save();
    return (event_created);
}

export default {
    create_event,
    find_event_by_datetime_and_created_by,
}