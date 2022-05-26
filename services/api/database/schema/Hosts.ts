const mongoose = require('mongoose');

const HostSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    website: {
        type: String,
        require: false,
    },
    location: {
        type: String,
        require: true,
    },
    tel: {
        type: String,
        require: false,
    },
    email: {
        type: String,
        require: false,
    },
    address: {
        type: String,
        require: true,
    },
    metro: {
        type: String,
        require: false
    },
    station: {
        type: String,
        require: false,
    },
    created_at: {
        type: Date,
        require: true,
    },
});

export default mongoose.model('Hosts', HostSchema);