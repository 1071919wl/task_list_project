const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const CommentSchema = require('./Comment');

const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })


const TaskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    comments: [CommentSchema]
},
    {
        timestamps: true
    })

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task


