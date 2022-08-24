const mongoose = require('mongoose');

const PasswordRequestion = mongoose.Schema({
    user_id: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    state: { // PENDING, VALIDATED, CANCELED
        type: String,
        require: true,
    },
    code: { // sent by email and used as check before password change
        type: String,
        require: true,
    },
    created_at: {
        type: Date,
        require: true,
    },
});

export default mongoose.model('PasswordRequestion', PasswordRequestion);