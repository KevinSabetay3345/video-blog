const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    nickname: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('User', userSchema);