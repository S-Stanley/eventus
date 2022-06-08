export {};
require('dotenv').config();
const mongoose = require('mongoose');

import Schema from "../schema/Schema";

const delete_all_hosts = async() => {
    await Schema.Hosts.deleteMany({});
}

const insert_host = async(
    name: string,
    website: string,
    location: string,
    tel: string,
    email: string,
    address: string,
    metro: string,
    station: string,
) => {
    await new Schema.Hosts({
        name: name,
        website: website,
        location: location,
        tel: tel,
        email: email,
        address: address,
        metro: metro,
        station: station,
        created_at: new Date(),
    }).save();
}

mongoose.connect(process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/').then(async() => {
    await delete_all_hosts();
    await insert_host(
        'Centre sportif de Neuilly',
        'https://websitefixture.com',
        'Neuilly sur Seine',
        '+33 0 00 00 00 00',
        'fixture001@email.com',
        '42, rue de Neuilly, 92200 Neuilly sur Seine',
        'M1',
        'Pont de Neuilly',
    );
    await insert_host(
        'Chatelet Parc',
        'https://websitefixture002.com',
        'Paris 01',
        '+33 0 00 00 00 00',
        'fixture002@email.com',
        '25, boulevard Sebatopol',
        'M1, M4, M7, M11, M14, RERA, RERB',
        'Chatelet les Halles',
    );
    mongoose.connection.close();
});