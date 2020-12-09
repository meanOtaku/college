const mongoose = require('mongoose');
const { model } = require('./User');

const Schema = mongoose.Schema;

const youtubeSchema = new Schema({
    link: {
        type: String,
        required: true,
    },
    person: {
        type: String,
        required: true,
    }
}, { timestamp: true });

const Youtube = mongoose.model('youtube', youtubeSchema);
module.exports = Youtube;