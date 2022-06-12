const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    firstname: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
    created_at: {
        type: Date,
        require: true,
    },
    player_id: {
        type: String,
        require: true,
    },
});

export default mongoose.model('Users', UserSchema);