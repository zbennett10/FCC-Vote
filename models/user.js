const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    joinDate: Date,
    polls: {
        type: Schema.Types.ObjectId,
        ref: 'poll'
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
