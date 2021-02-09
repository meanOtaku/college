const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const youtubeSchema = new Schema({
    link: {
        type: String,
        required: true,
        unique: true,
    },
    person: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    }
}, { timestamp: true });

const Youtube = mongoose.model('youtube', youtubeSchema);
module.exports = Youtube;