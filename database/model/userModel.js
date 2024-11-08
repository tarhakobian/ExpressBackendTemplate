const mongoose = require('../../api/config/databaseConfig');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'User'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
