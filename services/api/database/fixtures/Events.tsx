export {};
require('dotenv').config();
const mongoose = require('mongoose');

import ActivitiesInterface from "../../Interfaces/Activities";
import HostInterface from "../../Interfaces/Hosts";
import Schema from "../schema/Schema";

const delete_all_events = async() => {
    await Schema.Events.deleteMany({});
}

const insert_events = async(
    name: string,
    picture: string,
    host_id: string,
    activity_id: string,
    date_event: string,
    time_event: string,
    description: string,
    minimal_number_of_participants: string,
    maximal_number_of_participants: string,
    created_by: string,
) => {
    await new Schema.Events({
        name: name,
        picture: picture,
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
}

const get_activity_by_name = async(activity_name: string): Promise<ActivitiesInterface> => {
    const event = await Schema.Activities.findOne({
        name: activity_name,
    });
    return (event);
}

const get_host_by_name = async(host_name: string): Promise<HostInterface> => {
    const event = await Schema.Hosts.findOne({
        name: host_name,
    });
    return (event);
}

mongoose.connect(process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/').then(async() => {
    await delete_all_events();
    await insert_events(
        'Tennis a Neuilly',
        'https://cdn.pixabay.com/photo/2018/07/22/08/49/tennis-3554019_1280.jpg',
        (await get_host_by_name('Centre sportif de Neuilly'))._id,
        (await get_activity_by_name('Tennis'))._id,
        '10/06/22',
        '18:00',
        'Description is cool',
        '2',
        '3',
        'created_by',
    );
    await insert_events(
        'Foot a Chatelet',
        'https://cdn.pixabay.com/photo/2016/04/24/21/29/football-1350720_1280.jpg',
        (await get_host_by_name('Chatelet Parc'))._id,
        (await get_activity_by_name('Foot'))._id,
        '08/06/22',
        '14:00',
        'description',
        '6',
        '22',
        'created_by',
    );
    mongoose.connection.close();
});