const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String
    },
    joinDate: Date,
    polls: [{
        type: Schema.Types.ObjectId,
        ref: 'poll'
    }]
});

UserSchema.pre('remove', function(next) {
    const Poll = mongoose.model('poll'); //avoid cyclical require
    //clean up user's blogposts and comments
    // this === whichever user is being removed
    Poll.remove({ _id: {$in: this.polls }}) //remove every blogpost associated with this user
        .then(() => next());
});


const User = mongoose.model('user', UserSchema);

module.exports = User;
