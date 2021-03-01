const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    subtitle: {
        type: String,
        trim: true
    },
    ytURL: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    userNickname: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Post', postSchema);