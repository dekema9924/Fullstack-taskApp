const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdAt: {
        type: Date,
        default: Date.now()

    },
    user: {
        type:mongoose.Schema.ObjectId,
        ref: 'accounts',
        required: true
    }})

module.exports = mongoose.model('taskdb',TaskSchema )