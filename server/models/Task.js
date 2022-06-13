const { ObjectId } = require('mongodb');
const { model, Schema, Mongoose } = require('mongoose');

module.exports = model(
    "Task", new Schema({
    title:
    {
        type: String,
        required: true,
    },
    time:
    {
        type: String,
        required: true,
    }
    ,
    done: {
        type: Boolean,
        default: false
    }
 })
);