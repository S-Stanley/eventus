export {};
require('dotenv').config();
const mongoose = require('mongoose');

import Schema from "../schema/Schema";

const delete_all_events = async() => {
    await Schema.Activities.deleteMany({});
}

const insert_activity = async(name: string) => {
    await new Schema.Activities({
        name: name
    }).save();
}

mongoose.connect(process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/').then(async() => {
    await delete_all_events();
    await insert_activity('Tennis');
    await insert_activity('Basket');
    await insert_activity('Foot');
    mongoose.connection.close();
});