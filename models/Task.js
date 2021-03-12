const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const List = require('./List')

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
    list: {
        type: Schema.Types.ObjectId,
        ref: 'List',
        required: true
    },
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


