const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PollSchema = new Schema({
    title: String,
    options: [String],
    description: String,
    votes: {type: Number, default: 0},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Poll = mongoose.model('poll', PollSchema);

module.exports = Poll;