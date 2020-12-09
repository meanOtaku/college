const mongoose = require('mongoose');

const clubSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    whatdo: {
        type: String,
        required: true,
    }
}, { timestamp: true });

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;