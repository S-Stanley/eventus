const mongoose = require('mongoose');

const HostActivityRelation = mongoose.Schema({
    host_id: {
        type: String,
        require: true,
    },
    activity_id: {
        type: String,
        require: true,
    },
});

export default mongoose.model('HostActivityRelations', HostActivityRelation);