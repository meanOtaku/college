const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clubSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    person: {
        type: String,
        required: true
    }
}, { timestamp: true });

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;