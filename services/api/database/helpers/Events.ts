import EventInterface from "../../Interfaces/Events";
import Utils from "../../utils/Utils";
import Schema from "../schema/Schema";
const ObjectId = require('mongoose').Types.ObjectId;

const find_event_by_datetime_and_created_by = async (name: string, picture: string, host_id: string, activity_id: string, date_event: string, time_event:string, created_by: string): Promise<EventInterface> => {
    const event_to_find = await Schema.Events.findOne({
        name: name,
        picture: picture,
        host_id: host_id,
        activity_id: activity_id,
        date_event: date_event,
        time_event: time_event,
        created_by: created_by,
    });
    return (event_to_find);
}

const create_event = async(
    name: string,
    picture: string,
    host_id: string,
    activity_id: string,
    date_event: string,
    time_event: string,
    description: string,
    minimal_number_of_participants: string,
    maximal_number_of_participants: string,
    price: string,
    created_by: string,
    reservation_link: string = '',
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
    if (parseInt(price, 10) < 0){
        console.error('Invalid format price');
        return (false);
    }
    const event_created = await new Schema.Events({
        name: name,
        picture: picture,
        host_id: host_id,
        activity_id: activity_id,
        date_event: date_event,
        time_event: time_event,
        description: description,
        minimal_number_of_participants: minimal_number_of_participants,
        maximal_number_of_participants: maximal_number_of_participants,
        price: price,
        created_by: created_by,
        created_at: new Date(),
        reservation_link: reservation_link,
    }).save();
    return (event_created);
}

const get_all_events = async (page: number = 1, per_page: number = 10): Promise<EventInterface[] | boolean> => {
    if (page < 1 || per_page < 1) {
        return (false);
    }
    const all_events = await Schema.Events.find().skip((page - 1) * per_page).limit(per_page).lean();
    return (all_events);
}

const get_event_by_id = async (event_id: string): Promise<EventInterface | boolean> => {
    if (!ObjectId.isValid(event_id)) {
        console.error('Event_id is invalid');
        return (false);
    }
    const event_found = await Schema.Events.findOne({
        _id: event_id,
    });
    return (event_found);
}

export default {
    create_event,
    find_event_by_datetime_and_created_by,
    get_all_events,
    get_event_by_id,
}