const mongoose = require('mongoose');

const ActivitiesSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
});

export default mongoose.model('Activities', ActivitiesSchema);