const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    login: String,
    password: String,
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

module.exports = model('User', userSchema);
