const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    host_id: {
        type: String,
        require: true,
    },
    activity_id: {
        type: String,
        require: true,
    },
    date_event: {
        type: String,
        require: true,
    },
    time_event: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    minimal_number_of_participants: {
        type: String,
        require: true,
    },
    maximal_number_of_participants: {
        type: String,
        require: true,
    },
    created_by: {
        type: String,
        require: true,
    },
    created_at: {
        type: String,
        require: true,
    },
});

export default mongoose.model('Events', EventSchema);