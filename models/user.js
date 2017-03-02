const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    email: { type: String, unique: true},
    password: String,
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

//encrpt password
UserSchema.pre('save', function(next) {
    const user = this;
    bcrypt.genSalt(10, function(err, salt) {
        if(err) return next(err);
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        console.log(candidatePassword, this.password);
        console.log(isMatch);
        if(err) return callback(err);
        return callback(null, isMatch);
    }.bind(this));
}


const User = mongoose.model('user', UserSchema);

module.exports = User;
