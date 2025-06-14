const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    text: String,
    date: Date,
    author: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = model('Post', postSchema);
