const mongoose = require('mongoose');

const InvitationsSchema = mongoose.Schema({
    event_id: {
        type: String,
        require: true,
    },
    user_id: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
});

export default mongoose.model('Invitations', InvitationsSchema);