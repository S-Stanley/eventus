const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: {
        type: Number,
        require: false,
    },
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
    apple_user_id: {
        type: String,
        require: false,
        unique: false
    },
    role: {
        type: String,
        require: true,
        default: 'USER',
        enum: {
            values: ['ADMIN', 'USER'],
            message: '{VALUE} is not supported as user role',
        },
    },
});

export default mongoose.model('Users', UserSchema);